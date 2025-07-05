import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

//make sure this is DI throughout the app only once
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  //TODO: convert into a proper map
  readonly loading = signal(false);
  readonly loading$ = toObservable(this.loading);
}
