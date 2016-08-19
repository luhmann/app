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

  constructor(
  ) {
    this.shapeRecognition = new ShapeRecognition();
  }

  addPath(path) {
    let closestShape = this.shapeRecognition.getClosestShape(path);
    console.info(closestShape.name);
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

