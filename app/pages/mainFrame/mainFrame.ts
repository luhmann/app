import {Component} from '@angular/core';
import {
  MenuController,
  NavController}
  from 'ionic-angular';

import {HomePage}    from '../home/home';
import {AboutPage}   from '../about/about';
import {ContactPage} from '../contact/contact';
import {EditorPage}  from '../editor/editor';
import {LoginPage}   from "../login/login";
import {FirebaseAuth} from "angularfire2/angularfire2";

class Page{
  public page : any;
  public title: string;

}

@Component({
  templateUrl: 'build/pages/mainframe/mainframe.html'
})
export class MainFramePage {

  private rootPage: any;
  private pages   : Page[];
  private nav     : NavController;

  constructor(private menuCtrl: MenuController,
              private navCtrl:  NavController,
              private auth:     FirebaseAuth
  ) {
    this.rootPage = HomePage;
    this.pages = [
      {page: HomePage,    title: "Home"},
      {page: AboutPage,   title: "About"},
      {page: ContactPage, title: "Contact"},
      {page: EditorPage,  title: "Editor"},
      {page: LoginPage,   title: "Login"},
    ]
  }

  public openPage(page :Page){
    this.rootPage = page.page;
    this.menuCtrl.close();
  }

  private logout(){
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
