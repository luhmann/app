import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ShapeRecognition } from '../shape-recognition/shape-recognition';
import { Node } from './node';
/*
  Generated class for the NoderedIntegration provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NoderedIntegration {

  private shapeRecognition:ShapeRecognition;
  private boundingBoxes;
  private nodes:Array<Node>;

  constructor(
  ) {
    this.shapeRecognition = new ShapeRecognition();
    this.boundingBoxes = [];
    this.nodes = [];
  }

  addPath(path) {
    let closestShape = this.shapeRecognition.getClosestShape(path);
    console.info(closestShape.name);
    if(closestShape.name == 'line') {
      let fromNode;
      let toNode;
      let firstPoint = path.getPointAt(0);
      let lastPoint = path.getPointAt(path.length);
      for(let i = 0; i < this.nodes.length; i++) {
        let node = this.nodes[i];
        if(node.bounds.contains(firstPoint)) {
          fromNode = node;
        }
        if(node.bounds.contains(lastPoint)) {
          toNode = node;
        }
      }
      if(typeof fromNode == 'undefined') {
        console.warn("Warning! No origin node found for line. Not connecting anything.");
      }
      else if(typeof toNode == 'undefined') {
        console.warn("Warning! No target node found for line. Not connecting anything.");
      }
      else if(fromNode === toNode) {
        console.warn("Warning! A line is connecting a node with itself. Not connecting anything.");
      }
      else {
        fromNode.connectTo(toNode);
        console.info('connected node', fromNode.id, 'to', toNode.id);
      }
    }
    else {
      let merged = false;
      for(let i = 0; i < this.nodes.length; i++) {
        let node = this.nodes[i];
        if(node.overlaps(path)) {
          node.addPath(path);
          merged = true;
        }
      }
      if(!merged) {
        let node = new Node();
        node.addPath(path);
        this.nodes.push(node);
      }
    }
  }

  doodleToNoderedJson(arr) {
    return this.diagramToNoderedJson(this.doodleToDiagram(arr));
  }

  doodleToDiagram(paths) {
    var objects = [];
  }

  diagramToNoderedJson(objects) {

  }

}

