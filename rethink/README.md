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


### Mobile testing

Some notes for testing the application in development mode on the smartphone.

It's a little tricky testing the app in one smartphone. :) 

#### Initial Configuration
- you should start the msg-node with your choosen domain, like, `local.dev` or `testing.dev`, in my case i have `vitor.dev`
- start the message-node for the domain you choose.
- configure the toolkit on the [env file](https://github.com/reTHINK-project/dev-hyperty-toolkit/blob/develop/env) to reflect your domain and start it with `npm run start:dev`;
- go here [google apps](https://console.cloud.google.com/apis/credentials/oauthclient/808329566012-tqr8qoh111942gd2kg007t0s8f277roi.apps.googleusercontent.com?project=my-openid-project-1138) and add your domain to the `Authorized redirect URIs` list;
- get your machine IP

#### Application Configuration
- replace `<your ip address> for your IP in the follwoing entry on the package.json
```shell
  "mobile": "ng serve --live-reload false --ec true --host <your ip address>",
```
- start the app
```shell
npm run start:mobile
```

#### Smartphone Configuration
- need to root your smartphone (not recommended, try to use an old smartphone)
- need to install one application to access your smartphone hosts, and need to add the following domains:

NOTE: we can't use localhost directly, is rejected by the smartphone, we don't understand why.
in my case i configured the app to responde to my domain: vitor.dev

```shell
<your ip> <domain.dev>
<your ip> catalogue.<domain.dev>
<your ip> msg-node.<domain.dev>
```
- connect your smartphone to your current network, your development environment and your smartphone should be in the same network.
- now open your chrome and write on the address bar: `https://<your ip address>:8080`

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
