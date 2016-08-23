import { Component, HostListener } from '@angular/core';
import { NavController }           from 'ionic-angular';
import * as paper                  from "paper";
import {Size}                      from "paper";
import {Point}                     from "paper";
import {AngularFire}               from "angularfire2/angularfire2";
import defaultFirebase             from "angularfire2/angularfire2";
import {NavParams}                 from "ionic-angular/index";
import {Composition}               from "../../lib/Composition";
import {FirebaseListObservable}    from "angularfire2/angularfire2";
import {FirebaseObjectObservable}  from "angularfire2/angularfire2";
import {FirebaseOperation}         from "angularfire2/es6/utils/firebase_list_observable";
import {Path}                      from "paper";
import {Item}                      from "paper";
import {Tool}                      from "paper";
import {PenTool}                   from "./tools/PenTool";
import {FirePath}                  from "./tools/FirePath";
import { ActionTool }              from './tools/ActionTool';
import Reference    = firebase.database.Reference;
import DataSnapshot = firebase.database.DataSnapshot;
import { Node } from '../../providers/node-recognition/node';
import { NodeRecognition } from '../../providers/node-recognition/node-recognition';


/*
  Generated class for the EditorPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/



@Component({
  templateUrl: 'build/pages/editor/editor.html',
  providers: [NodeRecognition]
})
export class EditorPage{
  private path        :Path;
  private textItem    :paper.PointText;
  private loaded      :boolean;
  private paths       :FirebaseListObservable<any[]>
  private composition :FirebaseListObservable<Composition>

  constructor(private navCtrl :NavController,
              private fire    :AngularFire,
              private params  :NavParams,
	            private nodeRecognition:NodeRecognition)
  {
    let key = params.get("id");

    this.paths = fire.database.list('/paths/' + key);
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
    let reference :Reference = this.paths._ref as Reference;

    paper.view.viewSize = new paper.Size(new paper.Point(width,height));

    var handleFinishedPath = function(path) {
      this.nodeRecognition.addPath(path);
      //let paths = paper.project.getItems()[0].children;
    };

    var onTouch = function() {
      console.log('touch!');
    };

    var penTool = new PenTool(this.paths);
    var actionTool = new ActionTool();
    penTool.onPathFinished = handleFinishedPath.bind(this);
    actionTool.onTouch = onTouch.bind(this);

    this.textItem = new paper.PointText({
      content  : 'Click and drag to draw a line.',
      point    : new paper.Point(20, 30),
      fillColor: 'black',
    });

    // this.paths.subscribe(function() {
    //   console.log('changed');
    // });

    reference.on('child_added',   this.handleAddedChildren  .bind(this));
    reference.on('child_changed', this.handleChangedChildren.bind(this));

  }

  private handleAddedChildren(data :DataSnapshot)
  {
    let firePath = data.val() as FirePath;


    let item = paper.project.getItem(firePath.id) || new Path();
    item.importJSON(firePath.json);
    item.selected = false;

  }

  private handleChangedChildren(data :DataSnapshot)
  {
    let firePath = data.val() as FirePath;

    let path:Path;

    if (!this.path || this.path.id != firePath.id) {
      path = paper.project.getItem({id: firePath.id}) as Path;
      if (path) {
        path.removeChildren();
      }
      else {
        path = new Path();
      }
      path.importJSON(firePath.json);
      path.selected = false;
    }

  }

}
