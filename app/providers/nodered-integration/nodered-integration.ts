import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ShapeRecognition } from '../shape-recognition/shape-recognition';

/*
  Generated class for the NoderedIntegration provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NoderedIntegration {

  private shapeRecognition:ShapeRecognition;
  private boundingBoxes;
  private nodes;

  constructor(
  ) {
    this.shapeRecognition = new ShapeRecognition();
    this.boundingBoxes = [];
  }

  addPath(path) {
    let closestShape = this.shapeRecognition.getClosestShape(path);
    console.info(closestShape.name);
    this.boundingBoxes.push(path.bounds);
    for(let i = 0; i < this.boundingBoxes.length - 1; i++) {
      let box = this.boundingBoxes[i];
      if(this.overlaps(path.bounds, box)) {
        console.log('overlap');
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

  isBetween(n1, n2, n3) {
    return n1 >= n2 && n1 <= n3;
  }

  overlaps(box, container) {
    return (this.isBetween(box.x, container.x, container.x + container.width)
         && this.isBetween(box.y, container.y, container.y + container.height));
  }

}

