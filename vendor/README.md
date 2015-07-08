Gestao de Vendas
================

Aplicativo de apoio a equipe de vendas da Altamira Industria Metalurgica Ltda

Para publicar o aplicativo no [Google Play](https://play.google.com/apps/publish/?dev_acc=12148023397663272067#AppListPlace) 

Instructions to compile this project:

### This steps setup Android App

1. Download and install [Node JS](http://nodejs.org/)

2. Clone this repository at your git home

3. Follow this instruction to setup and run the environment

```shell
cd GIT_HOME/sales/vendor
npm install -g cordova ionic gulp
ionic plugin add https://github.com/phonegap-build/PushPlugin.git
ionic plugin add https://github.com/apache/cordova-plugin-whitelist.git
ionic add ngCordova
ionic add ionic-service-core
ionic add ionic-service-push
ionic serve --lab
```

To test on Android device

```sh
ionic run android --device
```

device should be attached first

To compile zipaligned and signed apk use Android Studio SDK: Build ->  Generate Signed APK

Also check this tutorials for setup Push Notification from scratch

(http://docs.ionic.io/v1.0/docs/push-from-scratch)

(http://docs.ionic.io/v1.0/docs/push-android-setup)

To setup GCM [GCM Google Cloud Message](https://developers.google.com/mobile/add)

### To test notification using GCM Google Cloud Message

Replace Ionic `APP_ID` from [https://apps.ionic.io/apps](https://apps.ionic.io/apps), `PUBLIC_KEY` from [https://apps.ionic.io/app/c2d913ca/config/keys](https://apps.ionic.io/app/c2d913ca/config/keys) and [GCM Project Number](https://console.developers.google.com/project/gestao-de-vendas) in file [/sales/vendor/www/js/app.js](/sales/vendor/www/js/app.js) as follow:

```sh
.config(function($stateProvider, $urlRouterProvider, $ionicAppProvider) {

  // Identify app
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: 'c2d913ca',
    // The public API key all services will use for this app
    api_key: 'be482b8b9ec4d2942a337f31bb3e69923cea3f023ed647a4',
    // The GCM project number
    gcm_id: '420419347783',
    // Set the app to use development pushes
    dev_push: false
  });
  
  ...
});
```

### To test submit POST to Ionic Push API

```sh
POST /api/v1/push HTTP/1.1
Host: push.ionic.io
Content-Type: application/json
X-Ionic-Application-Id: c2d913ca
Authorization: Basic NGIzODJmNWUyODcxZjliMzI4NzQ3NTRhZGI5NjFjMmU0YjMwMjc1YTAzYjg0MWI1Og==
Cache-Control: no-cache

{
  "tokens":[
    "APA91bHdGtWKBmykJerBi8gkqhYSF7Hgm3N6g6DRPylUt4Wk3F7RmljbZNBkQ8uFYh6RETcxde94fQ0yPscBlJlgzYdqXfLQKoB71v3Odw9zC6EjMo5Ajme0mnHp3P21d5K1Dmh-Gn5n"
  ],
  "notification":{
    "alert":"Eh Funciona",
    "android":{
      "collapseKey":"foo",
      "delayWhileIdle":true,
      "timeToLive":300,
      "payload":{
        "key1":"value",
        "key2":"value"
      }
    }
  }
}
```

Also check [Sending Push](http://docs.ionic.io/v1.0/docs/push-sending-push)

This web app uses [Ionic Framework](http://ionicframework.com) as a multi-platform responsive framework. To setup the environment follow this instructions [http://ionicframework.com/docs/guide/installation.html](http://ionicframework.com/docs/guide/installation.html).
