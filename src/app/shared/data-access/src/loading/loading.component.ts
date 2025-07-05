import { signal } from "@angular/core";

export abstract class LoadableComponent {
  protected readonly loading = signal(false);
}
