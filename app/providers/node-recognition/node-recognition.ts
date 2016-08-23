import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {ShapeRecognition} from '../shape-recognition/shape-recognition';
import {Node} from './node';
/*
 Generated class for the NodeRecognition provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class NodeRecognition {

  private shapeRecognition:ShapeRecognition;
  private boundingBoxes;
  private nodes:Array<Node>;

  constructor() {
    this.shapeRecognition = new ShapeRecognition();
    this.boundingBoxes = [];
    this.nodes = [];
  }

  addPath(path) {
    var closestShape;
    closestShape = this.shapeRecognition.getClosestShape(path);
    console.info(closestShape.name);
    switch (closestShape.name) {
      case 'line':
        let fromNode;
        let toNode;
        let firstPoint = path.getPointAt(0);
        let lastPoint = path.getPointAt(path.length);
        for (let i = 0; i < this.nodes.length; i++) {
          let node = this.nodes[i];
          if (node.bounds.contains(firstPoint)) {
            fromNode = node;
          }
          if (node.bounds.contains(lastPoint)) {
            toNode = node;
          }
        }
        if (typeof fromNode == 'undefined') {
          console.warn("Warning! No origin node found for line. Not connecting anything.");
        }
        else if (typeof toNode == 'undefined') {
          console.warn("Warning! No target node found for line. Not connecting anything.");
        }
        else if (fromNode === toNode) {
          fromNode.addPath(path);
        }
        else {
          fromNode.connectTo(toNode);
          console.info('connected node', fromNode.id, 'to', toNode.id);
        }
        break;
      case 'point':
        console.log('Click!');
        this.getOverlappingNodes(path).forEach(function (node) {
          node.digest();
        });
        break;
      default:
        let merged = false;
        this.getOverlappingNodes(path).forEach(function (node) {
          node.addPath(path, closestShape.name);
          merged = true;
        });
        if (!merged) {
          let node = new Node();
          node.addPath(path, closestShape.name);
          this.nodes.push(node);
        }
        this.flow();
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

  getOverlappingNodes(path) {
    var nodes = [];
    for (let i = 0; i < this.nodes.length; i++) {
      let node = this.nodes[i];
      if (node.overlaps(path)) {
        nodes.push(node);
      }
    }
    return nodes;
  }

  flow() {
    for (let i = 0; i < this.nodes.length; i++) {
      let node = this.nodes[i];
      if (node.inputs.length == 0) {
        node.digest();
      }
    }
  }

}

