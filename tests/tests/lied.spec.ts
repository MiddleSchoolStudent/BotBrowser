import { test, expect } from "@playwright/test";

test("ensure iframe content window width differs from window inner width", async ({
    page,
}) => {
    await page.goto("about:blank");

    // Inspired by Kasada
    const result = await page.evaluate(() => {
        const windowInnerWidth = window.innerWidth;
        const iframe = document.createElement("iframe");
        document.body.appendChild(iframe);
        return windowInnerWidth === iframe.contentWindow?.innerWidth;
    });

    await expect(result).toBe(false);
});

test("canvas rendering consistency", async ({ page }) => {
    await page.goto("about:blank");

    // Main thread drawing logic
    const drawScript = `(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        // Drawing on the canvas
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, 100, 100);
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(150, 50, 30, 0, Math.PI * 2);
        ctx.fill();

        // Convert canvas to image data
        return canvas.toDataURL();
    })();`;

    // Main thread canvas content
    const mainThreadCanvasData = await page.evaluate(drawScript);

    // Worker rendering logic
    const workerScript = `
        (() => {
        return new Promise((resolve) => {
        const workerCode = \`self.onmessage = () => {
            const canvas = new OffscreenCanvas(200, 200);
            const ctx = canvas.getContext('2d');
            // Drawing on the canvas
            ctx.fillStyle = 'red';
            ctx.fillRect(0, 0, 100, 100);
            ctx.fillStyle = 'blue';
            ctx.beginPath();
            ctx.arc(150, 50, 30, 0, Math.PI * 2);
            ctx.fill();
            // Convert canvas to blob and send back
            canvas.convertToBlob().then(blob => {
            const reader = new FileReader();
            reader.onload = () => {
                self.postMessage(reader.result);
            };
            reader.readAsDataURL(blob);
            });
        }\`;
        const blob = new Blob([workerCode], { type: 'application/javascript' });
        const worker = new Worker(URL.createObjectURL(blob));
        worker.onmessage = (event) => {
            resolve(event.data);
        };
        worker.postMessage({});
        });
        })()
    `;

    // Worker canvas content
    const workerCanvasData = await page.evaluate(workerScript);

    // Compare both canvases
    const isEqual = await page.evaluate(
        ([mainThreadCanvasData, workerCanvasData]) => {
            const img1 = document.createElement("img");
            const img2 = document.createElement("img");

            img1.src = mainThreadCanvasData;
            img2.src = workerCanvasData;

            return new Promise((resolve) => {
                img1.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = 200;
                    canvas.height = 200;
                    const ctx = canvas.getContext("2d");

                    // Draw the first image
                    ctx.drawImage(img1, 0, 0);
                    const data1 = ctx.getImageData(
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );

                    // Clear and draw the second image
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img2, 0, 0);
                    const data2 = ctx.getImageData(
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );

                    // Compare pixel data
                    if (data1.data.length !== data2.data.length) resolve(false);

                    for (let i = 0; i < data1.data.length; i++) {
                        if (data1.data[i] !== data2.data[i]) {
                            resolve(false);
                        }
                    }

                    resolve(true);
                };
            });
        },
        [mainThreadCanvasData, workerCanvasData]
    );

    // Expect the canvases to match
    await expect(isEqual).toBe(true);
});

test("hardware concurrency comparison between window and sharedworker", async ({
    page,
}) => {
    await page.goto("https://google.com");

    const concurrencyResult = await page.evaluate(() => {
        return new Promise((resolve) => {
            // Check SharedWorker support
            if (!("SharedWorker" in window)) {
                resolve({
                    supported: false,
                    error: "SharedWorker not supported",
                });
                return;
            }

            // Get window hardwareConcurrency
            const windowConcurrency = navigator.hardwareConcurrency;

            // Create a simple SharedWorker script
            const swScript = `
              onconnect = (event) => {
                const port = event.ports[0];
                const swConcurrency = navigator.hardwareConcurrency;
                port.postMessage({
                  windowConcurrency: event.data,
                  swConcurrency: swConcurrency
                });
              };
            `;

            // Convert script to Blob
            const blob = new Blob([swScript], {
                type: "application/javascript",
            });
            const swUrl = URL.createObjectURL(blob);

            // Create a new SharedWorker
            const worker = new SharedWorker(swUrl);

            // Create a message channel with timeout
            const timeoutId = setTimeout(() => {
                resolve({
                    supported: false,
                    error: "Message response timeout",
                });
            }, 5000);

            worker.port.onmessage = (event) => {
                clearTimeout(timeoutId);
                resolve({
                    supported: true,
                    windowConcurrency,
                    swConcurrency: event.data.swConcurrency,
                });
            };

            // Send message to SharedWorker
            worker.port.postMessage(windowConcurrency);
        });
    });

    // Handle test result
    if (!concurrencyResult.supported) {
        console.warn("SharedWorker test failed:", concurrencyResult.error);
        test.skip();
        return;
    }

    // Assert hardwareConcurrency match
    expect(concurrencyResult.windowConcurrency).toBe(
        concurrencyResult.swConcurrency
    );
});

test("results of the measureText empty string should be 0", async ({
    page,
}) => {
    await page.goto("about:blank");

    const result = await page.evaluate(() => {
        const getTextMetricsFloatLie = (context) => {
            const {
                    actualBoundingBoxAscent,
                    actualBoundingBoxDescent,
                    actualBoundingBoxLeft,
                    actualBoundingBoxRight,
                    fontBoundingBoxAscent,
                    fontBoundingBoxDescent,
                } = context.measureText("") || {},
                result = [
                    actualBoundingBoxAscent,
                    actualBoundingBoxDescent,
                    actualBoundingBoxLeft,
                    actualBoundingBoxRight,
                    fontBoundingBoxAscent,
                    fontBoundingBoxDescent,
                ].find((item) =>
                    ((_0xfe5247) => _0xfe5247 % 1 != 0)(item || 0)
                );
            return result;
        };

        const canvas = document.createElement("canvas");
        const context2d = canvas.getContext("2d");
        return getTextMetricsFloatLie(context2d);
    });

    await expect(result).toBe(undefined);
});
