import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/core/app.config';
import { AppComponent } from '@pli-shared/layout';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
