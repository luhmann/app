import {Component} from '@angular/core';
import {Platform, ionicBootstrap, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {defaultFirebase, FIREBASE_PROVIDERS} from 'angularfire2';


@Component({
  templateUrl: "build/app.html"
})
export class MyApp {

  private rootPage: any;


  constructor(private platform: Platform, public menuCtrl: MenuController) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // StatusBar.styleDefault();
      StatusBar.styleBlackTranslucent();
    });
  }
}

ionicBootstrap(MyApp);
