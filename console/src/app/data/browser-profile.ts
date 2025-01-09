export interface BasicInfo {
    profileName: string | null;
    groupName?: string | null;
    description?: string | null;
}

export interface BotProfileInfo {
    filename: string | null;
    content?: string | null;
}

export interface ProxyInfo {
    proxyHost?: string | null;
    username?: string | null;
    password?: string | null;
}

export interface VariablesInfo {
    locale?: string | null;
    timezone?: string | null;
    noisesCanvas2d?: boolean | null;
    noisesCanvasWebgl?: boolean | null;
    noisesClientRectsFactor?: boolean | null;
    noisesTextMetricsFactor?: boolean | null;
    noisesAudio?: boolean | null;
    disableConsoleMessage?: boolean | null;
    botBrowserBinaryPath?: string | null;
}

export enum BrowserProfileStatus {
    Idle,
    Launching,
    LaunchFailed,
    Running,
    Stopping,
    StopFailed,
}

export const BrowserProfileStatusText = {
    [BrowserProfileStatus.Idle]: 'Idle',
    [BrowserProfileStatus.Launching]: 'Launching',
    [BrowserProfileStatus.LaunchFailed]: 'Launch Failed',
    [BrowserProfileStatus.Running]: 'Running',
    [BrowserProfileStatus.Stopping]: 'Stopping',
    [BrowserProfileStatus.StopFailed]: 'Stop Failed',
};

export function getBrowserProfileStatusText(
    status: BrowserProfileStatus
): string {
    return BrowserProfileStatusText[status];
}

export interface BrowserProfile {
    id: string;
    basicInfo: Partial<BasicInfo>;
    botProfileInfo: Partial<BotProfileInfo>;
    proxyInfo: Partial<ProxyInfo>;
    variablesInfo: Partial<VariablesInfo>;
    createdAt: number;
    updatedAt: number;
    warmupUrls?: string;
    lastUsedAt?: number;
    deletedAt?: number;
    variableValues?: {
        storageQuotaInBytes?: number;
        noises?: {
            clientRectsFactor: number;
            textMetricsFactor: number;
            canvas2d: number[];
            canvasWebgl: number[];
            audio: number[];
        };
    };
}
