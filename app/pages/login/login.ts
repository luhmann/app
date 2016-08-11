import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, AuthProviders,AuthMethods } from "angularfire2/angularfire2";

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

  constructor(private navCtrl: NavController,
              private fire:AngularFire) {
    this.fire.auth.subscribe( auth=>console.log(auth));
  }

  private login() {
    this.fire.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    })
  }


}
