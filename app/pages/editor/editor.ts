import { Component, HostListener } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as paper        from "paper";
import {Size}            from "paper";
import {Point}           from "paper";
import {AngularFire}     from "angularfire2/angularfire2";
import defaultFirebase   from "angularfire2/angularfire2";
import {NavParams}       from "ionic-angular/index";
import {Composition}     from "../../lib/Composition";
import {FirebaseListObservable} from "angularfire2/angularfire2";
import {Path} from "paper";
import {FirebaseObjectObservable} from "angularfire2/angularfire2";
import {Item} from "paper";
import {FirebaseOperation} from "angularfire2/es6/utils/firebase_list_observable";
import Reference = firebase.database.Reference;
import DataSnapshot = firebase.database.DataSnapshot;


/*
  Generated class for the EditorPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/


interface FirePath {
  id   :number;
  json :string;
}

@Component({
  templateUrl: 'build/pages/editor/editor.html',
})
export class EditorPage{
  private path        :Path;
  private textItem    :paper.PointText;
  private loaded      :boolean;
  private paths       :FirebaseListObservable<any[]>
  private composition :FirebaseListObservable<Composition>
  private keyToPaths  :{[key:string]: {path :Path, id  :number, reference :Reference}};
  private idToKey     :{[id :number]: {path :Path, key :string, reference :Reference}};

  constructor(private navCtrl :NavController,
              private fire    :AngularFire,
              private params  :NavParams)
  {
    let key = params.get("id");

    this.paths = fire.database.list('/paths/' + key);
    this.keyToPaths = {};
    this.idToKey    = {};
  }

  ionViewDidEnter() {
    this.initPaper();
  }


  private initPaper(){
    let canvas :HTMLElement = document.getElementById("myCanvas");
    paper.setup("myCanvas");
    let _canvas :HTMLCanvasElement = canvas as HTMLCanvasElement;
    let width  :number = _canvas.clientWidth;
    let height :number = _canvas.clientHeight;


    //debugger;
    console.log(paper, _canvas);

    paper.view.viewSize = new paper.Size(new paper.Point(width,height));
    paper.tool = new paper.Tool();
    paper.tool.onMouseUp   = this.onMouseUp  .bind(this);
    paper.tool.onMouseDown = this.onMouseDown.bind(this);
    paper.tool.onMouseDrag = this.onMouseDrag.bind(this);

    this.textItem = new paper.PointText({
      content  : 'Click and drag to draw a line.',
      point    : new paper.Point(20, 30),
      fillColor: 'black',
    });
    ;

    //this.paths.subscribe(this.handleSubscribtion);

    let reference :Reference = this.paths._ref as Reference;
    reference.on('child_added', this.handleAddedChildren);
    reference.on('child_changed', this.handleChangedChildren);

  }

  private handleAddedChildren(data :DataSnapshot){
    let firePath = data.val() as FirePath;
    let key      = data.key;

    console.log("new Child", data, firePath);
    console.log(key, firePath);
    
    let item = paper.project.getItem(firePath.id);
    if(item) item.importJSON(firePath.json);
    else new Path(firePath.json);
  }

  private handleChangedChildren(data :DataSnapshot){
    let firePath = data.val() as FirePath;
    let key      = data.key;

    console.log("changed Child", data, firePath);
    console.log(key, firePath);

    let item = paper.project.getItem(firePath.id);
    if(item) item.importJSON(firePath.json);
    else new Path(firePath.json);
  }

  private onMouseDown(event :paper.ToolEvent) {
    // If we produced a path before, deselect it:
    if (this.path) {
      this.path.selected = false;
    }

    this.path = new Path({
      segments: [event.point],
      strokeColor: 'black',
      // Select the path, so we can see its segment points:
      fullySelected: true
    });

    let json = this.path.exportJSON();
    let id   = this.path.id;

    var firePath :FirePath = {json:json, id:id};
    this.paths.push(firePath).then(
      (response: any)=>{
        let reference :Reference = response as Reference;
        let key       :string    = reference.key;
        let path      :Path      = this.path;
        this.keyToPaths[key] = {id : id,  path: path, reference: reference};
        this.idToKey   [id]  = {key: key, path: path, reference: reference};
        console.log(response);
      }
    )
  }


  // While the user drags the mouse, points are added to the path
  // at the position of the mouse:
  private onMouseDrag(event :paper.ToolEvent) {
    this.path.add(event.point);

    // Update the content of the text item to show how many
    // segments it has:
    this.textItem.content = 'Segment count: ' + this.path.segments.length;

    //var json = this.path.exportJSON();
    this.savePathChanges();

  }

  private savePathChanges() {
    let id = this.path.id;
    let idToKey = this.idToKey[id];

    if (idToKey) {
      let key = idToKey.key;
      let json = this.path.exportJSON();

      let firePath:FirePath = {json: json, id: id};

      console.log(key);
      this.keyToPaths[key].reference.set(firePath);
    }
  };

// When the mouse is released, we simplify the path:
  private onMouseUp(event:paper.ToolEvent) {
    let segmentCount = this.path.segments.length;

    // When the mouse is released, simplify it:
    this.path.simplify(10);

    // Select the path, so we can see its segments:
    this.path.fullySelected = true;

    let newSegmentCount = this.path.segments.length;
    let difference = segmentCount - newSegmentCount;
    let percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
    this.textItem.content = difference + ' of the ' + segmentCount + ' segments were removed. Saving ' + percentage + '%';
    this.path.selected = false;
    this.savePathChanges();
  }

}
