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
parcel watch index.ts
```
This will bundle the js to a file in `www/dist/bundled.js` which is the path that the shiny app looks for the js in.

## Building a "deployment" version of app

First generate a bundled javascript file without source-map bloat
```bash
parcel build index.ts --no-source-maps
```

The shiny app is now good-to-go but we need to generate the html page for the web-app version.

To do this run the script `generate_plain_html.R` to make an up-to-date html page that matches the shiny app.
