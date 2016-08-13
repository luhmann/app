import {Component}     from '@angular/core';
import {NavController} from 'ionic-angular';
import {AngularFire}   from "angularfire2/angularfire2";
import {FirebaseListObservable} from "angularfire2/angularfire2";
import {Query} from "angularfire2/utils/query_observable";
import {Composition} from "../../lib/Composition";
import {EditorPage} from "../editor/editor";

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  compositions: FirebaseListObservable<Composition[]>;
  constructor(private navCtrl :NavController,
              private fire    :AngularFire)
  {
    this.compositions = fire.database.list('/compositions')
  }

  private newComposition(){
    this.compositions.push({
      name: "hi"
    }).then(
      _composition=>this.openComposition(_composition),
      l=>console.log("reject", l))
  }

  private openComposition(_composition :any){
    var key :string = _composition.key || _composition.$key;
    console.log(key);
    this.navCtrl.push(EditorPage, {
      id: key
    })
  }
}
