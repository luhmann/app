import {Component} from '@angular/core';
import {
  Platform,
  ionicBootstrap,
  MenuController}
  from 'ionic-angular';

import {StatusBar}     from 'ionic-native';
import {MainFramePage} from './pages/mainframe/mainframe';
import {
  defaultFirebase,
  FIREBASE_PROVIDERS,
  firebaseAuthConfig,
  AuthProviders,
  AuthMethods}
  from 'angularfire2';


@Component({
  templateUrl: "build/app.html",
  providers:[
    FIREBASE_PROVIDERS,
    defaultFirebase({
      apiKey: "AIzaSyDakq2TR4elcalv26ihMK8djrXQ7o_bpJA",
      authDomain: "turink-1e8d9.firebaseapp.com",
      databaseURL: "https://turink-1e8d9.firebaseio.com",
      storageBucket: "turink-1e8d9.appspot.com",
    }),
    firebaseAuthConfig({
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
      remember: 'default',
      scope: ['email']
    })
  ]
})
export class MyApp {

  private rootPage: any;


  constructor(private platform: Platform) {
    this.rootPage = MainFramePage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // StatusBar.styleDefault();
      StatusBar.styleBlackTranslucent();
    });
    }
}

ionicBootstrap(MyApp);
