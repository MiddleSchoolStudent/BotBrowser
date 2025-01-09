import { Directive, HostListener } from '@angular/core';

@Directive({ selector: '[app-stop-propagation]', standalone: true })
export class StopPropagationDirective {
    @HostListener('click', ['$event'])
    onClick(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
    }
}
