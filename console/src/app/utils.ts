import * as Neutralino from '@neutralinojs/lib';
import { AppName } from './const';

export function formatDateTime(ts?: number | Date | null): string {
    if (!ts) return '';
    const date = typeof ts === 'number' ? new Date(ts) : ts;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export async function createDirectoryIfNotExists(path: string): Promise<void> {
    try {
        await Neutralino.filesystem.getStats(path);
    } catch {
        await Neutralino.filesystem.createDirectory(path);
    }
}

export async function getAppDataPath(subPath?: string): Promise<string> {
    const systemDataPath = await Neutralino.os.getPath('data');
    const fullPath = [systemDataPath, AppName, subPath]
        .filter(Boolean)
        .join('/');
    await createDirectoryIfNotExists(fullPath);
    return fullPath;
}

export async function compressFolder(
    folderPath: string,
    outputPath: string
): Promise<void> {
    try {
        const osInfo = await Neutralino.computer.getOSInfo();
        const osType = osInfo.name;

        let command;
        if (osType.includes('Linux') || osType.includes('Darwin')) {
            // Extract the parent directory and folder name
            const folderName = folderPath.split('/').pop();
            const parentPath = folderPath.substring(
                0,
                folderPath.lastIndexOf('/')
            );

            // Change to the parent directory and zip the folder by its name
            command = `(cd "${parentPath}" && zip -r "${outputPath}" "${folderName}")`;
        } else if (osType.includes('Windows')) {
            // Use PowerShell on Windows
            const parentPath = folderPath.substring(
                0,
                folderPath.lastIndexOf('\\')
            );
            const folderName = folderPath.split('\\').pop();
            command = `powershell -Command "Set-Location -Path '${parentPath}'; Compress-Archive -Path '${folderName}\\*' -DestinationPath '${outputPath}'"`;
        } else {
            throw new Error('Unsupported operating system');
        }

        const response = await Neutralino.os.execCommand(command);
        console.log('Command output: ', response.stdOut);
    } catch (error) {
        console.error('Error during folder compression: ', error);
    }
}

export async function decompressZip(
    zipPath: string,
    outputFolder: string
): Promise<void> {
    try {
        // Get the OS information
        const osInfo = await Neutralino.computer.getOSInfo();
        const osType = osInfo.name;

        let command;
        if (osType.includes('Windows')) {
            // On Windows, use PowerShell's Expand-Archive command
            command = `powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${outputFolder}' -Force"`;
        } else if (osType.includes('Linux') || osType.includes('Darwin')) {
            // On macOS or Linux, use unzip command
            command = `unzip -o '${zipPath}' -d '${outputFolder}'`;
        } else {
            throw new Error('Unsupported operating system');
        }

        const response = await Neutralino.os.execCommand(command);
        console.log('Command output: ', response.stdOut);
    } catch (error) {
        console.error('Error during decompression: ', error);
    }
}

export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
