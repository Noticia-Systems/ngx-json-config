[![Node.js Package](https://github.com/Noticia-Systems/ngx-json-config/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/Noticia-Systems/ngx-json-config/actions/workflows/npm-publish.yml) [![Node.js CI](https://github.com/Noticia-Systems/ngx-json-config/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/Noticia-Systems/ngx-json-config/actions/workflows/node.js.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

ngx-json-config allows for loading of json config files on Angular startup for dynamic configurations that are not included during compile time (like environment vars).

## Installation

``npm install @noticia-systems/ngx-json-config``

## Usage

Define one or more config interfaces:

```typescript
export interface AppConfig {
    exampleApiUrl: string;
    exampleApiKey: string;
    
    ...
}
```

Create an ``InjectionToken`` (e.g. in the ``AppModule`` or the interface file) for the defined config interfaces:

```typescript
export const APP_CONFIG = new InjectionToken<AppConfig>('AppConfig');
```

Configure the module for the config usage:

```typescript
@NgModule({
  providers: [
    // include the JsonConfigService 
    JsonConfigService,
    
    // load the configs in the APP_INITIALIZER
    {
      provide: APP_INITIALIZER,
      useFactory: (jsonConfigService: JsonConfigService) => () => jsonConfigService.load$([
        {
          identifier: APP_CONFIG,
          url: '/assets/app-config.json'
        }
      ]),
      deps: [JsonConfigService],
      multi: true
    },
    
    // create provider to inject the config into classes.
    {
      provide: APP_CONFIG,
      useFactory: (jsonConfigService: JsonConfigService) => jsonConfigService.get(APP_CONFIG),
      deps: [JsonConfigService]
    }
  ]
  ...
})
export class AppModule {
}
```

Inject the configs into classes:

```typescript
export class TestService {
  constructor(@Inject(APP_CONFIG) public appConfig: AppConfig) {}
}
```
