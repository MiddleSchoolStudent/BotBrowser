import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild, type AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import * as Neutralino from '@neutralinojs/lib';
import { cloneDeep } from 'lodash-es';
import { v4 as uuidv4 } from 'uuid';
import { CloneBrowserProfileComponent } from './clone-browser-profile.component';
import { AppName } from './const';
import { BrowserProfileStatus, type BrowserProfile, type ProxyInfo } from './data/browser-profile';
import { EditBrowserProfileComponent } from './edit-browser-profile.component';
import { BrowserLauncherService } from './shared/browser-launcher.service';
import { BrowserProfileService } from './shared/browser-profile.service';
import { ConfirmDialogComponent } from './shared/confirm-dialog.component';
import { StopPropagationDirective } from './shared/stop-propagation.directive';
import { compressFolder, decompressZip, formatDateTime } from './utils';
import { WarmupComponent } from './warmup.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        MatButtonModule,
        MatMenuModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        StopPropagationDirective,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
    readonly #browserProfileService = inject(BrowserProfileService);
    readonly browserLauncherService = inject(BrowserLauncherService);

    readonly AppName = AppName;
    readonly #dialog = inject(MatDialog);
    readonly formatDateTime = formatDateTime;
    readonly BrowserProfileStatus = BrowserProfileStatus;
    readonly displayedColumns = ['select', 'name', 'group', 'status', 'lastUsedAt', 'updatedAt', 'createdAt'];
    readonly dataSource = new MatTableDataSource<BrowserProfile>([]);
    readonly selection = new SelectionModel<BrowserProfile>(true, []);

    @ViewChild(MatSort) sort!: MatSort;

    constructor() { }

    newProfile(): void {
        this.#dialog
            .open(EditBrowserProfileComponent)
            .afterClosed()
            .subscribe((result) => {
                console.log(`Dialog result: ${result}`);
                this.refreshProfiles().then().catch(console.error);
            });
    }

    editProfile(browserProfile: BrowserProfile): void {
        this.#dialog
            .open(EditBrowserProfileComponent, {
                data: browserProfile,
            })
            .afterClosed()
            .subscribe((result) => {
                console.log(`Dialog result: ${result}`);
                this.refreshProfiles().then().catch(console.error);
            });
    }

    editSelectedProfile(): void {
        if (this.selection.selected.length !== 1) {
            throw new Error('Please select one profile to edit');
        }

        this.editProfile(this.selection.selected[0]!);
    }

    toggleSelectProfile(browserProfile: BrowserProfile): void {
        this.selection.toggle(browserProfile);
    }

    cloneProfile(browserProfile: BrowserProfile): void {
        this.#dialog
            .open(CloneBrowserProfileComponent)
            .afterClosed()
            .subscribe(async (result: number) => {
                await Promise.all(
                    Array.from({ length: result }).map(() => {
                        const newProfile = cloneDeep(browserProfile);
                        newProfile.id = uuidv4();
                        newProfile.createdAt = Date.now();
                        newProfile.updatedAt = Date.now();
                        return this.#browserProfileService.saveBrowserProfile(newProfile);
                    })
                );

                await this.refreshProfiles();
            });
    }

    async exportProfile(browserProfile: BrowserProfile): Promise<void> {
        const entry = await Neutralino.os.showSaveDialog('Export browser profile', {
            filters: [{ name: 'Zip', extensions: ['zip'] }],
        });

        const browserProfilePath = await this.#browserProfileService.getBrowserProfilePath(browserProfile);
        await compressFolder(browserProfilePath, entry);
    }

    async warmupProfile(browserProfile: BrowserProfile): Promise<void> {
        this.#dialog
            .open(WarmupComponent, { data: browserProfile })
            .afterClosed()
            .subscribe(async (result?: string) => {
                if (!result) return;
                console.log('Warmup result: ', result);

                await this.browserLauncherService.run(browserProfile, true);
            });
    }

    async importProfile(): Promise<void> {
        const entry = await Neutralino.os.showOpenDialog('Import a browser profile', {
            filters: [{ name: 'Zip', extensions: ['zip'] }],
        });

        if (!entry?.[0]) return;

        const browserProfilePath = await this.#browserProfileService.getBasePath();
        await decompressZip(entry[0], browserProfilePath);
        await this.refreshProfiles();
    }

    deleteProfiles(): void {
        if (this.selection.selected.length === 0) {
            throw new Error('Please select profiles to delete');
        }

        this.#dialog
            .open(ConfirmDialogComponent, {
                data: {
                    message: 'Are you sure you want to delete the selected profiles?',
                },
            })
            .afterClosed()
            .subscribe(async (result: boolean) => {
                if (!result) return;

                await this.#browserProfileService.deleteBrowserProfiles(
                    this.selection.selected.map((profile) => profile.id)
                );
                await this.refreshProfiles();
            });
    }

    deleteProfile(browserProfile: BrowserProfile): void {
        this.#dialog
            .open(ConfirmDialogComponent, {
                data: {
                    message: `Are you sure you want to delete the profile "${browserProfile.basicInfo.profileName}"?`,
                },
            })
            .afterClosed()
            .subscribe(async (result: boolean) => {
                if (!result) return;

                await this.#browserProfileService.deleteBrowserProfiles([browserProfile.id]);
                await this.refreshProfiles();
            });
    }

    async refreshProfiles(): Promise<void> {
        const profiles = await this.#browserProfileService.getAllBrowserProfiles();
        const selectedIds = this.selection.selected.map((profile) => profile.id);
        this.dataSource.data = profiles;

        this.selection.clear();
        this.selection.select(...profiles.filter((profile) => selectedIds.includes(profile.id)));
    }

    async ngAfterViewInit(): Promise<void> {
        const envs = await Neutralino.os.getEnvs();
        console.log('Envs:', envs);

        const config = await Neutralino.app.getConfig();
        console.log('Config:', config);

        console.log('MatSort:', this.sort);
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
            switch (sortHeaderId) {
                case 'name':
                    return data.basicInfo.profileName ?? '';
                case 'group':
                    return data.basicInfo.groupName ?? '';
                case 'status':
                    return this.browserLauncherService.getRunningStatus(data);
                case 'lastUsedAt':
                    return data.lastUsedAt ?? 0;
                case 'updatedAt':
                    return data.updatedAt ?? 0;
                case 'createdAt':
                    return data.createdAt ?? 0;
                default:
                    return '';
            }
        };

        await this.refreshProfiles();
    }

    get isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    toggleAllRows(): void {
        if (this.isAllSelected) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.dataSource.data);
    }

    checkboxLabel(row?: BrowserProfile): string {
        if (!row) {
            return `${this.isAllSelected ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
    }

    exportToCSV(): void {
        const headers = ['name', 'group', 'description', 'bot_profile', 'proxy', 'executable_path', 'warm_up_urls', 'locale'];

        const rows = (this.selection.selected.length > 0 ? this.selection.selected : this.dataSource.data).map(
            (profile) => ({
                name: profile.basicInfo?.profileName || '',
                group: profile.basicInfo?.groupName || '',
                description: profile.basicInfo?.description || '',
                bot_profile: profile.botProfileInfo?.filename || '',
                proxy: this.formatProxy(profile.proxyInfo),
                executable_path: profile.variablesInfo?.botBrowserBinaryPath || '',
                warm_up_urls: profile.warmupUrls || '',
                locale: profile.variablesInfo?.locale || '',
            })
        );

        const csvContent = [
            headers.join(','),
            ...rows.map((row) => headers.map((header) => `${row[header as keyof typeof row] || ''}`).join(',')),
        ].join('\n');

        const defaultFilename = 'profiles.csv';
        Neutralino.os
            .showSaveDialog('Save CSV File', {
                defaultPath: defaultFilename,
                filters: [{ name: 'CSV', extensions: ['csv'] }, { name: 'All files', extensions: ['*'] }],
            })
            .then((filePath) => {
                if (!filePath) {
                    console.warn('Save operation was canceled.');
                    return;
                }

                Neutralino.filesystem
                    .writeFile(filePath, csvContent)
                    .then(() => {
                        console.log(`CSV file saved successfully at ${filePath}`);
                        Neutralino.os.showMessageBox('Success', 'CSV file has been successfully exported!');
                    })
                    .catch((err) => {
                        console.error('Failed to save CSV file:', err);
                        Neutralino.os.showMessageBox('Error', 'Failed to export CSV file. Please check the logs!');
                    });
            })
            .catch((err) => {
                console.error('Failed to show save dialog:', err);
                Neutralino.os.showMessageBox('Error', 'Unable to display the save dialog. Please check the logs!');
            });
    }

    async importProfilesFromCSV(): Promise<void> {
        const entry = await Neutralino.os.showOpenDialog('Import profiles from CSV', {
            filters: [{ name: 'CSV', extensions: ['csv'] }],
        });

        if (!entry?.[0]) {
            console.warn('No file selected for import.');
            return;
        }

        const filePath = entry[0];

        try {
            const fileContent = await Neutralino.filesystem.readFile(filePath);
            const lines = fileContent.split('\n').filter((line) => line.trim() !== '');

            if (lines.length <= 1) {
                console.warn('CSV file is empty or only contains headers.');
                Neutralino.os.showMessageBox('Warning', 'The CSV file is empty or only contains headers. Please check the file content!');
                return;
            }

            const headers = lines[0]?.split(',').map((header) => header.trim()) || [];
            const data = lines.slice(1).map((line) => {
                const values = line.split(',').map((value) => value.trim());
                return headers.reduce((obj: any, header, index) => {
                    obj[header] = values[index] || '';
                    return obj;
                }, {});
            });

            const profiles = data.map(async (row: any) => {
                const { name, group, description, bot_profile, proxy, executable_path, warm_up_urls, locale } = row;

                let username = null;
                let password = null;
                let proxyHostValue = null;

                if (proxy) {
                    if (proxy.includes('@')) {
                        [username, password] = proxy.split('@')[0]?.split(':') || [null, null];
                        proxyHostValue = proxy.split('@')[1];
                    } else {
                        proxyHostValue = proxy;
                    }
                }

                let botProfileContent = '';
                if (bot_profile) {
                    try {
                        botProfileContent = await Neutralino.filesystem.readFile(bot_profile);
                    } catch (error) {
                        console.error(`Failed to read bot profile file: ${bot_profile}`, error);
                        botProfileContent = '';
                    }
                }

                const variablesInfo = {
                    botBrowserBinaryPath: executable_path || '',
                    locale: locale || 'en-US',
                    noisesCanvas2d: true,
                    noisesClientRectsFactor: true,
                    noisesCanvasWebgl: true,
                    noisesTextMetricsFactor: true,
                    noisesAudio: true,
                    timezone: 'America/New_York',
                    disableConsoleMessage: true,
                };

                const newProfile: BrowserProfile = {
                    id: uuidv4(),
                    basicInfo: {
                        profileName: name || '',
                        groupName: group || '',
                        description: description || '',
                    },
                    botProfileInfo: {
                        filename: bot_profile || '',
                        content: botProfileContent,
                    },
                    proxyInfo: {
                        proxyHost: proxyHostValue || '',
                        username: username || '',
                        password: password || '',
                    },
                    variablesInfo,
                    variableValues: {},
                    warmupUrls: warm_up_urls || '',
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                };

                return newProfile;
            });

            const resolvedProfiles = await Promise.all(profiles);

            await Promise.all(resolvedProfiles.map((profile) => this.#browserProfileService.saveBrowserProfile(profile)));
            await this.refreshProfiles();
            Neutralino.os.showMessageBox('Success', 'CSV file has been successfully imported!' );
        } catch (error) {
            console.error('Failed to import profiles from CSV:', error);
            Neutralino.os.showMessageBox('Error', 'Failed to import CSV file. Please check the logs!' );
        }
    }

    private formatProxy(proxy: Partial<ProxyInfo> | undefined): string {
        if (!proxy) return '';
        const { username, password, proxyHost } = proxy;

        const credentials = [username, password].filter(Boolean).join(':');
        return [credentials, proxyHost].filter(Boolean).join('@');
    }

    async runBrowserProfile(browserProfile: BrowserProfile): Promise<void> {
        await this.browserLauncherService.run(browserProfile);
    }

    async stopBrowserProfile(browserProfile: BrowserProfile): Promise<void> {
        await this.browserLauncherService.stop(browserProfile);
    }
}
