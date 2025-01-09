import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import {
    Component,
    inject,
    ViewChild,
    type AfterViewInit,
} from '@angular/core';
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
import {
    BrowserProfileStatus,
    type BrowserProfile,
} from './data/browser-profile';
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
    readonly displayedColumns = [
        'select',
        'name',
        'group',
        'status',
        'lastUsedAt',
        'updatedAt',
        'createdAt',
    ];
    readonly dataSource = new MatTableDataSource<BrowserProfile>([]);
    readonly selection = new SelectionModel<BrowserProfile>(true, []);

    @ViewChild(MatSort) sort!: MatSort;

    constructor() {}

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
                        return this.#browserProfileService.saveBrowserProfile(
                            newProfile
                        );
                    })
                );

                await this.refreshProfiles();
            });
    }

    async exportProfile(browserProfile: BrowserProfile): Promise<void> {
        const entry = await Neutralino.os.showSaveDialog(
            'Export browser profile',
            { filters: [{ name: 'Zip', extensions: ['zip'] }] }
        );

        const browserProfilePath =
            await this.#browserProfileService.getBrowserProfilePath(
                browserProfile
            );
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
        const entry = await Neutralino.os.showOpenDialog(
            'Import a browser profile',
            { filters: [{ name: 'Zip', extensions: ['zip'] }] }
        );

        if (!entry?.[0]) return;

        const browserProfilePath =
            await this.#browserProfileService.getBasePath();
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
                    message:
                        'Are you sure you want to delete the selected profiles?',
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

                await this.#browserProfileService.deleteBrowserProfiles([
                    browserProfile.id,
                ]);
                await this.refreshProfiles();
            });
    }

    async refreshProfiles(): Promise<void> {
        const profiles =
            await this.#browserProfileService.getAllBrowserProfiles();
        const selectedIds = this.selection.selected.map(
            (profile) => profile.id
        );
        this.dataSource.data = profiles;

        this.selection.clear();
        this.selection.select(
            ...profiles.filter((profile) => selectedIds.includes(profile.id))
        );
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

    async runBrowserProfile(browserProfile: BrowserProfile): Promise<void> {
        await this.browserLauncherService.run(browserProfile);
    }

    async stopBrowserProfile(browserProfile: BrowserProfile): Promise<void> {
        await this.browserLauncherService.stop(browserProfile);
    }
}
