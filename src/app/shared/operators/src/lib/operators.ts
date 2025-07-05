import {
  Observable,
  OperatorFunction,
  tap,
  finalize,
  startWith,
  map,
} from 'rxjs';
import { signal, WritableSignal } from '@angular/core';

/**
 * Custom RxJS operator that manages loading state for any observable
 * @param loadingSignal - The signal to update with loading state
 * @param initialValue - Optional initial value to emit while loading
 * @returns OperatorFunction that handles loading state
 */
export function withLoading<T>(
  loadingSignal: WritableSignal<boolean>,
): OperatorFunction<T, T> {
  return (source: Observable<T>) => {
    const baseSource = source.pipe(
      tap(() => loadingSignal.set(true)),
      finalize(() => loadingSignal.set(false)),
    );

    return baseSource;
  };
}

/**
 * Custom RxJS operator that manages loading state with a specific identifier
 * @param loadingMap - Map to track loading states by identifier
 * @param identifier - Unique identifier for this loading state
 * @returns OperatorFunction that handles loading state with identifier
 */
export function withLoadingId<T>(
  loadingMap: Map<string, boolean>,
  identifier: string,
): OperatorFunction<T, T> {
  return (source: Observable<T>) => {
    return source.pipe(
      tap(() => loadingMap.set(identifier, true)),
      finalize(() => loadingMap.delete(identifier)),
    );
  };
}

/**
 * Custom RxJS operator that emits loading metadata alongside the data
 * @param identifier - Unique identifier for this request
 * @returns OperatorFunction that wraps data with loading metadata
 */
export function withLoadingMetadata<T>(
  identifier: string,
): OperatorFunction<T, { loading: boolean; data?: T; requestId: string }> {
  return (source: Observable<T>) => {
    return source.pipe(
      map((data) => ({ loading: false, data, requestId: identifier })),
      startWith({ loading: true, data: undefined, requestId: identifier }),
      finalize(() => {
        // Loading is set to false in the map operator above
      }),
    );
  };
}

/**
 * Custom RxJS operator that handles errors with loading state
 * @param loadingSignal - The signal to update with loading state
 * @param errorHandler - Optional error handler function
 * @returns OperatorFunction that handles loading and errors
 */
export function withLoadingAndError<T>(
  loadingSignal: WritableSignal<boolean>,
  errorHandler?: (error: any) => void,
): OperatorFunction<T, T> {
  return (source: Observable<T>) => {
    return source.pipe(
      tap(() => loadingSignal.set(true)),
      tap({
        error: (error) => {
          if (errorHandler) {
            errorHandler(error);
          }
        },
      }),
      finalize(() => loadingSignal.set(false)),
    );
  };
}
