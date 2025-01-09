import { Component, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import {
    MatDialogRef,
    MatDialogModule,
    MatDialog,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { isValidUrl } from './utils';
import type { BrowserProfile } from './data/browser-profile';
import { AlertDialogComponent } from './shared/alert-dialog.component';
import { BrowserProfileService } from './shared/browser-profile.service';

@Component({
    selector: 'app-warmup-list',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
    templateUrl: './warmup.component.html',
    styleUrls: ['./warmup.component.scss'],
})
export class WarmupComponent {
    readonly #browserProfileService = inject(BrowserProfileService);

    #injectedData = inject<BrowserProfile>(MAT_DIALOG_DATA);
    #dialog = inject(MatDialog);
    #dialogRef = inject(MatDialogRef<WarmupComponent>);

    warmupForm: FormGroup = inject(FormBuilder).group({
        urls: [this.#injectedData.warmupUrls, Validators.required],
    });

    #checkUrlValidity(): boolean {
        if (!this.warmupForm.valid) return false;
        const urls = this.warmupForm.get('urls')?.value;
        if (!urls) return false;

        const lines = urls.split('\n');
        const isValid = lines.every((line: string) => isValidUrl(line.trim()));
        if (!isValid) return false;

        return true;
    }

    onWarmup() {
        if (!this.onSave(false)) return;

        const urls = this.warmupForm.get('urls')?.value as string;
        this.#injectedData.warmupUrls = urls;
        this.#dialogRef.close(urls);
    }

    onSave(promptSuccess = true): boolean {
        if (!this.#checkUrlValidity()) {
            this.#dialog.open(AlertDialogComponent, {
                data: { message: 'Please enter valid URLs.' },
            });
            return false;
        }

        this.#injectedData.warmupUrls = this.warmupForm.get('urls')?.value;
        this.#browserProfileService.saveBrowserProfile(this.#injectedData);

        if (promptSuccess) {
            this.#dialog.open(AlertDialogComponent, {
                data: { message: 'Warmup URLs saved.' },
            });
        }

        return true;
    }

    onCancel() {
        this.#dialogRef.close();
    }
}
