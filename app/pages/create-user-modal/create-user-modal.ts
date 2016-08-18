import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TextInput} from "ionic-angular/index";
import {ToastController} from "ionic-angular/index";
import { AngularFire, AuthProviders,AuthMethods, FirebaseAuth } from "angularfire2/angularfire2";
import {EmailPasswordCredentials} from "angularfire2/providers/auth_backend";
import {FirebaseAuthState} from "angularfire2/angularfire2";
import Error = firebase.auth.Error;
import {root} from "rxjs/util/root";
import defaultFirebase from "angularfire2/angularfire2";
import FIREBASE_PROVIDERS from "angularfire2/angularfire2";
import {ModalController} from "ionic-angular/index";
import {ViewController} from "ionic-angular/index";

/*
  Generated class for the CreateUserModalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

const toastDuration: number = 3000;

@Component({
  templateUrl: 'build/pages/create-user-modal/create-user-modal.html',
})
export class CreateUserModalPage {
  private newCredentials: EmailPasswordCredentials;
  private emailPattern:   RegExp;

  constructor(private navCtrl:   NavController,
              private toastCtrl: ToastController,
              private fire:      AngularFire,
              private auth:      FirebaseAuth,
              private viewCtrl:  ViewController
  )
  {
    this.auth.subscribe( auth=>console.log(auth));

    this.newCredentials = {email:"", password:""};
    this.emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  private signUp() {
    if (!this.validateEmail()) {
      this.showToastBadMailAddress();
    } else {
      this.createUser();
    }
  }

  private createUser() {
    this.auth.createUser(this.newCredentials)
      .then (this.successSignup)
      .catch(this.errorSignUp.bind(this));
  };

  private errorSignUp(error :Error){
    console.error(error);
    let toast = this.toastCtrl.create({
      message:  error.message,
      duration: toastDuration
    });
    toast.present();
  }

  private successSignup(state :FirebaseAuthState){
    this.dismiss();
  }

  private dismiss() {
    this.viewCtrl.dismiss();
  };

  private showToastBadMailAddress(){
    let toast = this.toastCtrl.create({
      message:  "invalid Email Address.",
      duration: toastDuration
    });
    toast.present();
  }

  private validateEmail() :boolean{
    return this.validateEmailString(this.newCredentials.email);
  }

  private validateEmailString(email) :boolean{
    var re = this.emailPattern;
    return re.test(email);
  }

}
