import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import * as Neutralino from '@neutralinojs/lib';

Neutralino.init();
Neutralino.events.on('windowClose', () => Neutralino.app.exit());

bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
);
