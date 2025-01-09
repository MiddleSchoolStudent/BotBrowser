export type BotProfileBasicInfo =
    | {
          version: string;
          userAgent: string;
          isEncryptedProfile: false;
      }
    | {
          isEncryptedProfile: true;
      };

export function tryParseBotProfile(data: string): BotProfileBasicInfo | null {
    try {
        const info = JSON.parse(data);

        if (typeof info.key === 'string' && typeof info.profile === 'string') {
            return { isEncryptedProfile: true };
        }

        const version = info.profileVersion;
        const userAgent = info.fingerprints.browser.navigator.userAgent;
        if (typeof version === 'string' && typeof userAgent === 'string') {
            return { version, userAgent, isEncryptedProfile: false };
        }

        return null;
    } catch {
        return null;
    }
}
