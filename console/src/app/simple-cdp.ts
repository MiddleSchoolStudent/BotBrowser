interface CDPResponse {
    id: number;
    result?: any;
    error?: any;
}

export class SimpleCDP {
    #webSocket?: WebSocket;
    #messageId: number = 0;
    #callbacks: Map<number, (response: CDPResponse) => void> = new Map();

    constructor(private wsURL: string) {}

    public async connect(): Promise<void> {
        const webSocket = new WebSocket(this.wsURL);
        this.#webSocket = webSocket;

        return new Promise((resolve, reject) => {
            webSocket.onopen = () => {
                console.log('Connected to Chrome DevTools Protocol');
                resolve();
            };

            webSocket.onmessage = (event) => this.#handleMessage(event);

            webSocket.onerror = (error) => {
                console.error('WebSocket error:', error);
                reject(error);
            };

            webSocket.onclose = () => {
                console.log('WebSocket connection closed');
            };
        });
    }

    #handleMessage(event: MessageEvent) {
        const message: CDPResponse = JSON.parse(event.data);
        const callback = this.#callbacks.get(message.id);
        if (callback) {
            callback(message);
            this.#callbacks.delete(message.id);
        }
    }

    async #sendCommandToTarget(
        sessionId: string,
        method: string,
        params: object = {}
    ): Promise<any> {
        return this.#sendCommand('Target.sendMessageToTarget', {
            sessionId,
            message: JSON.stringify({ id: ++this.#messageId, method, params }),
        });
    }

    #sendCommand(method: string, params: object = {}): Promise<any> {
        const webSocket = this.#webSocket;
        if (!webSocket) {
            throw new Error('WebSocket connection is not established');
        }

        const id = ++this.#messageId;
        const message = JSON.stringify({ id, method, params });

        return new Promise((resolve, reject) => {
            this.#callbacks.set(id, (response: CDPResponse) => {
                if (response.error) {
                    reject(response.error);
                } else {
                    resolve(response.result);
                }
            });

            webSocket.send(message);
        });
    }

    public async getTargets(): Promise<any[]> {
        const result = await this.#sendCommand('Target.getTargets');
        return result.targetInfos;
    }

    public async attachToTarget(targetId: string): Promise<string> {
        const result = await this.#sendCommand('Target.attachToTarget', {
            targetId,
            flatten: false,
        });
        return result.sessionId;
    }

    public async navigate(sessionId: string, url: string): Promise<void> {
        await this.#sendCommandToTarget(sessionId, 'Page.navigate', { url });
    }

    public async scrollPage(
        sessionId: string,
        deltaX: number = 0,
        deltaY: number = 100
    ): Promise<void> {
        await this.#sendCommandToTarget(sessionId, 'Input.dispatchMouseEvent', {
            type: 'mouseWheel',
            x: 0,
            y: 0,
            deltaX,
            deltaY,
        });
    }

    public async click(sessionId: string, x: number, y: number): Promise<void> {
        // Dispatch mousePressed
        await this.#sendCommandToTarget(sessionId, 'Input.dispatchMouseEvent', {
            type: 'mousePressed',
            x,
            y,
            button: 'left',
            clickCount: 1,
        });

        // Dispatch mouseReleased
        await this.#sendCommandToTarget(sessionId, 'Input.dispatchMouseEvent', {
            type: 'mouseReleased',
            x,
            y,
            button: 'left',
            clickCount: 1,
        });
    }

    public close(): void {
        this.#webSocket?.close();
    }
}
