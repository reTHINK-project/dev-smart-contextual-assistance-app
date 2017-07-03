# Rethink

## Install

It's mandatory installing the @angular/cli like a global module;

```shell
npm install -g @angular/cli
```

**Note for Windows Users:**
In case you have errors like
```
... error MSB4019: The imported project "C:\Microsoft.Cpp.Default.props" was not found. Confirm that the path in the <Import> declaration is correct, and that the file exists on disk.
```
make sure you have Visual Studio installed and for the module raising this error execute `npm install` specifying your visual Studio version. Example:

`npm install node-sass -msvs_version=2008`


## Development server

Run `ng serve` for a dev server. Navigate to `https://localhost:8080/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Thanks to:
The notification system we are using was based on this repository https://github.com/flauc/angular2-notifications
Thanks;
