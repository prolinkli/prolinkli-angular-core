import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/core/app.config.server';
import { AppComponent } from '@pli-shared/layout';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
