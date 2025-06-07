import { execFile } from 'child_process';
import fs from 'node:fs';
import { promisify } from 'util';
import { expect, test } from '../global-setup';
import { sleep } from '../utils';

const execFileAsync = promisify(execFile);

async function transcribeWithCLI(audioPath: string) {
    const { stdout } = await execFileAsync(
        // Assuming you have the Whisper CLI installed
        'whisper',
        [audioPath, '--model', 'base', '--task', 'transcribe', '--output_format', 'txt'],
        { encoding: 'utf8' }
    );
    return stdout.trim().split('\n').at(-1)?.split(']')[1]?.trim() || '';
}

test('v2', async ({ page }) => {
    await page.goto('https://recaptcha-demo.appspot.com/recaptcha-v2-checkbox.php');

    const frame = page.frameLocator('iframe[title="reCAPTCHA"][role="presentation"]').first();
    await frame.locator('span#recaptcha-anchor').click();

    const challengeFrame = page.frameLocator('iframe[title="recaptcha challenge expires in two minutes"]').first();

    const audioResponsePromise = page.waitForResponse(
        (resp) =>
            resp.url().includes('https://www.google.com/recaptcha/enterprise/payload') &&
            resp.headers()['content-type']?.includes('audio/mp3')
    );
    await challengeFrame.locator('button#recaptcha-audio-button').click();

    const audioResponse = await audioResponsePromise;
    const audioBlob = await audioResponse.body();

    // Save the audio blob to temporary file
    const audioFilePath = `/tmp/recaptcha-audio-${Date.now()}.mp3`;
    fs.writeFileSync(audioFilePath, audioBlob);

    // Transcribe the audio using Whisper CLI
    const transcription = await transcribeWithCLI(audioFilePath);
    console.log('Transcription:', transcription);

    // Clean up the temporary audio file
    fs.unlinkSync(audioFilePath);

    await challengeFrame.locator('input#audio-response').fill(transcription);
    await challengeFrame.locator('button#recaptcha-verify-button').click();

    await frame.locator('div.recaptcha-checkbox-checkmark').waitFor({ state: 'visible' });
});

test('v3', async ({ page }) => {
    test.setTimeout(120_000);

    await page.goto('https://antcpt.com/score_detector/', { timeout: 60_000 }).catch(() => {});

    let score: number = 0;
    for (let n = 0; n < 10; n++) {
        const yourScoreText = await page.locator('text=Your score is:').innerText();
        score = parseFloat(yourScoreText.match(/(0\.\d)/)![0]!);

        if (score < 0.5) {
            await page.locator('text=Refresh score now!').click();
            await sleep(3000);
            continue;
        }

        break;
    }

    expect(score).toBeGreaterThanOrEqual(0.5);
});
