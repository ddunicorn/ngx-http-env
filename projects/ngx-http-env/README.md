# Runtime environment for Angular

Retrieve the environment configuration by HTTP on app startup.

## Installation

```bash
#!/bin/bash
npm install --save npx-http-env
````

## Usage

Edit the `main.ts` such that the environment is loaded _before_ app startup. This enables usage of the configuration in `NgModules` imported in the `AppModule`.

``` ts
// main.ts

// (1) Add the following import
import { DYNAMIC_ENVIRONMENT, env } from 'ngx-http-env';

// (2) Move the original logic of main.ts to callback of subscribe
env(environment, url='/assets/environments/environment.json').subscribe(
  env => {

    // place the orinal logic of main.ts here
    if (env.production) {
      enableProdMode();
    }

    // (3) Add the following provider
    platformBrowserDynamic([{
      provide: DYNAMIC_ENVIRONMENT,
      useValue: env
    }])
    .bootstrapModule(AppModule)
    .catch(err => console.log(err));
  },
  err => console.error("Failed to load environment configuration", err)
)

```

After that, the global `environment` object was altered. It can be used to configure your app almost without changes.

**IMPORTANT:**
Since `environment` is set dynamically, it must also be read dynamically. A build-time copy will not work

```ts
// wrong
private endpoint: string = `${environment.api}/endpoint`;
// right
private get endpoint(): string {  return `${environment.api}/endpoint`; }
```

## Use dynamic environment to configure imported modules

If the imported module exports services that expect a configuration object to be injected, e.g. `export class LibraryService(private config: LibraryServiceConfig)`, then a provider is required that depends on the injection token `DYNAMIC_ENVIRONMENT`.

``` ts
// app.module.ts
import { DYNAMIC_ENVIRONMENT } from 'ngx-http-env';

@NgModule({
  declarations: [ /* ... */ ],
  imports: [
    LibraryModule
  ],
  providers: [
    // Provide the dependent modules
    { 
      provide: LibraryModuleConfig, 
      useFactory: (env:any) => env.libraryConfig,
      deps: [DYNAMIC_ENVIRONMENT]
    },
    /* ... */
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() { }
}
```

