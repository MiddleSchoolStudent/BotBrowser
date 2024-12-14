import { defineConfig } from '@playwright/test';

import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: {
                headless: true,
                launchOptions: {
                    executablePath: process.env.BROWSER_EXECUTABLE_PATH,
                    args: [
                        `--bot-profile=${process.env.BOT_PROFILE_PATH}`,
                        '--mute-audio',
                    ],
                },
            },
        },
    ],
});
