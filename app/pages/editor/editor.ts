import { Component, HostListener } from '@angular/core';
import { NavController } from 'ionic-angular';
import {  } from 'paper';
import {$$iterator} from "rxjs/symbol/iterator";
import * as paper from "paper";
import {Size} from "paper";
import {Point} from "paper";
import { ShapeDetection } from '../../providers/shape-detection/shape-detection';


/*
  Generated class for the EditorPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/editor/editor.html',
  providers: [ShapeDetection]
})


export class EditorPage{
  private path     :paper.Path;
  private textItem :paper.PointText;
  private loaded   :boolean;

  constructor(private navCtrl:NavController, private shapeDetection:ShapeDetection) {



  }

  private ngAfterViewInit() {
    //TODO: that's a crappy way to do it
    setTimeout(this.initPaper.bind(this), 1000);
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

  }




  private onMouseDown(event :paper.ToolEvent) {
    // If we produced a path before, deselect it:
    if (this.path) {
      this.path.selected = false;
    }

    this.path = new paper.Path({
      segments: [event.point],
      strokeColor: 'black',
      // Select the path, so we can see its segment points:
      fullySelected: true
    });
  }


  // While the user drags the mouse, points are added to the path
  // at the position of the mouse:
  private onMouseDrag(event :paper.ToolEvent) {
    this.path.add(event.point);

    // Update the content of the text item to show how many
    // segments it has:
    this.textItem.content = 'Segment count: ' + this.path.segments.length;
  }

// When the mouse is released, we simplify the path:
  private onMouseUp(event:paper.ToolEvent) {
    var segmentCount = this.path.segments.length;

    // When the mouse is released, simplify it:
    this.path.simplify(10);

    // Select the path, so we can see its segments:
    this.path.fullySelected = true;

    var newSegmentCount = this.path.segments.length;
    var difference = segmentCount - newSegmentCount;
    var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
    this.textItem.content = difference + ' of the ' + segmentCount + ' segments were removed. Saving ' + percentage + '%';

    let closestShape = this.shapeDetection.getClosestShape(this.path);
    console.info(closestShape.name);
  }

}
