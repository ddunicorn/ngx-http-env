# Runtime environment for Angular

Retrieve the environment configuration by HTTP on app startup.

This is the development frame for the ngx-http-env. Usage and installation instructions for ngx-http-env can be found in the [**PACKAGE README**](./projects/ngx-http-env/README.md)

## Contribution

Build locally

``` bash
npx ng build --configuration=development
```

To use the local build another Angular project, edit the consumers tsconfig.json

```js
// tsconfig.json
{
  // ...
  "compilerOptions": {
    "paths": {
      "ngx-http-env": [
        // Paths are intepreted relative to compilerOptions.baseUrl
        "<path-to-ngx-http-env>/dist/ngx-http-env",
        "<path-to-ngx-http-env>/dist/ngx-http-env/ngx-http-env"
      ]
    },
    // ...
  }
  // ...
}
```

The library can then be imported as usual

``` ts
import { DYNAMIC_ENVIRONMENT } from 'ngx-http-env';

// ...
```


### Publish

``` bash
npx ng build
cd dist/ngx-http-env
npm publish
```
