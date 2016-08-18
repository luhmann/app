import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, AuthProviders,AuthMethods, FirebaseAuth } from "angularfire2/angularfire2";
import {EmailPasswordCredentials} from "angularfire2/providers/auth_backend";
import {FirebaseAuthState} from "angularfire2/angularfire2";
import {ModalController} from "ionic-angular/index";
import {CreateUserModalPage} from "../create-user-modal/create-user-modal";
import Error = firebase.auth.Error;
import {MainFramePage} from "../mainframe/mainFrame";
import {ToastController} from "ionic-angular/index";

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

  private credentials :EmailPasswordCredentials;

  constructor(private navCtrl:   NavController,
              private modalCtrl: ModalController,
              private toastCtrl: ToastController,
              private fire:      AngularFire,
              private auth:      FirebaseAuth)
  {
    this.fire.auth.subscribe(this.authenticationHandler.bind(this))
    this.auth.getAuth();
    this.credentials = {email:"", password:""};
  }

  private login() {
    this.fire.auth.login(this.credentials, {
      method:AuthMethods.Password,
    }).then((state: FirebaseAuthState )=>{
        console.log(state);
      }
    ).catch(this.onBadLogin.bind(this));
  }

  private onBadLogin(error :Error) {
    (error:Error)=>console.error(error);
    let toast = this.toastCtrl.create({
      message:  error.message,
      duration: 3000,
    });
    toast.present();
  }

  private signUp() {
    let modal = this.modalCtrl.create(CreateUserModalPage);
    modal.present();

  }

  private authenticationHandler(authState :FirebaseAuthState) {
    console.log(authState);
    if(authState){
      this.navCtrl.setRoot(MainFramePage);
    }
  }

  private logout(){
    this.auth.logout();
  }


}
