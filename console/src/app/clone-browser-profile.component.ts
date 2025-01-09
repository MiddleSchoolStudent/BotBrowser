import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
    selector: 'app-clone-browser-profile',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatStepperModule,
        MatAutocompleteModule,
    ],
    templateUrl: './clone-browser-profile.component.html',
    styleUrl: './clone-browser-profile.component.scss',
})
export class CloneBrowserProfileComponent {
    readonly #dialogRef = inject(MatDialogRef<CloneBrowserProfileComponent>);

    numberOfClones = '1';

    onOk(): void {
        let result = null;
        if (/^\d+$/.test(this.numberOfClones)) {
            result = parseInt(this.numberOfClones, 10);
        }

        this.#dialogRef.close(result);
    }

    onCancel(): void {
        this.#dialogRef.close();
    }
}
