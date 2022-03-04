import { Injectable, InjectionToken } from '@angular/core';
import { combineLatest, Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

/**
 * This service allows for APP_INITIALIZERs to load json configs on startup.
 * Useful if configs should be dynamically changeable after compilation.
 */
@Injectable({
  providedIn: 'root'
})
export class JsonConfigService {

  // #region Fields

  /**
   * The loaded config objects.
   */
  public configs: Map<InjectionToken<any>, Object> = new Map;

  // #endregion

  // #region Constructors

  /**
   * Initializes a new instance of the {@link JsonConfigService} class.
   * @param httpClient {@link HttpClient} for loading json configs at runtime.
   */
  constructor(
    private httpClient: HttpClient
  ) {
  }

  // #endregion

  // #region Methods

  /**
   * Loads the json config on subscription.
   * @param configs Configs to load on startup using an {@link InjectionToken} and the associated config url.
   * @returns Observable for the loading process.
   */
  public load$(configs: { identifier: InjectionToken<any>, url: string }[]): Observable<Object[]> {
    let observables = [];

    for (let config of configs) {
      observables.push(this.httpClient.get(config.url).pipe(
        tap(cfg => this.configs.set(config.identifier, cfg))
      ));
    }

    return combineLatest(observables);
  }

  /**
   * Gets a preloaded config object.
   * @param identifier {@link InjectionToken} used to identify the requested config.
   */
  public get<T>(identifier: InjectionToken<any>): T | undefined {
    return this.configs.get(identifier) as T | undefined;
  }

  // #endregion

}
