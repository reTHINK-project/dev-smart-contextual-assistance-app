# Smart Contextual Assistance App

## How to deploy to GitHub Pages 
* [Follow this documentation at wiki](https://github.com/reTHINK-project/dev-smart-contextual-assistance-app/wiki)


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


### Mobile testing

**TODO:** Update this documentation (missing the hysmart redirect)

Some notes for testing the application in development mode on the smartphone.

It's a little tricky testing the app in one smartphone. :) 

**NOTE:** You need to be in the same network as your server;

Start the app

```shell
npm run start
```

**Browser**

- open a new tab in chrome with: chrome://inspect/#devices
- open the configuration for "port forwarding..."
- on `port` add `5555`
- on `IP address and port` add the `localhost:8080` (this is the address where our app is running)

**Smartphone/tablet**

- open the chrome and put in URL: `https://localhost:5555`
- to have the full features (service workers) you should install [this certificate]() in your device.

**How to install a custom certificate (android)**

- Settings > Security
- ***Credential Storage*** > Install from SD card

If something is not working right please open an [issue](https://github.com/reTHINK-project/dev-smart-contextual-assistance-app/issues/new);

Thank you;

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
