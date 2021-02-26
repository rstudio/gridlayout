# Running dev environment

Parcel is used for bundling up dependencies.


All commands are run from within the `www/` directory.

## Actively developing just for front-end:

``` bash
parcel index.html
```
This will give you a live-reload server.

## Actively developing for shiny:

``` bash
parcel index.ts
```
This will bundle the js to a file in `www/dist/bundled.js` which is the path that the shiny app looks for the js in.

## Building a version for shiny "deployment"
``` bash
parcel build index.ts --no-minify -o bundled.js 
```

# Building a version for main deployment
```bash
parcel build index.ts --no-source-maps
```


