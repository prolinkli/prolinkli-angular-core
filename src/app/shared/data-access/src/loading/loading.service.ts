import { Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

type SignalMap = Map<string, unknown>;

//make sure this is DI throughout the app only once
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  //TODO: convert into a proper map
  readonly loading = signal(false);
  readonly loading$ = toObservable(this.loading);

  //state
  private readonly _loadingMap: SignalMap = new Map<string, unknown>();
  private readonly loadingMapSubject = new BehaviorSubject<SignalMap>(
    this._loadingMap,
  );

  public readonly loadingMap = this.loadingMapSubject.asObservable();
  public readonly loadingMapSignal = toSignal(
    this.loadingMapSubject.asObservable(),
  );

  public markAsLoading<R>(key: string, value: R): boolean {
    if (this._loadingMap.has(key)) {
      return false; // Already loading
    }
    this.setLoading(key, value);
    return true;
  }

  public markAsNotLoading(key: string): boolean {
    if (!this._loadingMap.has(key)) {
      return false; // Not loading
    }
    this.deleteLoading(key);
    return true;
  }

  private mutateMap(map: Map<string, unknown>): SignalMap {
    return {
      ...map,
      get: (key: string) => this.getLoading(key),
      set: (key: string, value: unknown) => this.setLoading(key, value),
      clear: () => this.clearLoading(),
      delete: (key: string) => this.deleteLoading(key),
    };
  }

  private getLoading<R>(key: string): R | undefined {
    return this._loadingMap.get(key) as R | undefined;
  }

  private setLoading<R>(key: string, value: R): SignalMap {
    const newMap = this.mutateMap(this._loadingMap);
    this._loadingMap.set(key, value);
    this.loadingMapSubject.next(newMap);
    return newMap;
  }

  private deleteLoading(key: string): boolean {
    const deleted = this._loadingMap.delete(key);
    if (deleted) {
      const newMap = this.mutateMap(this._loadingMap);
      this.loadingMapSubject.next(newMap);
    }
    return deleted;
  }

  private clearLoading(): SignalMap {
    const newMap = this.mutateMap(this._loadingMap);
    this._loadingMap.clear();
    this.loadingMapSubject.next(newMap);
    return newMap;
  }
}
