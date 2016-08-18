import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the Shape provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

var shapes = [
  {
    name: "circle",
    points: [{"x":0.4543355552916117,"y":0.10871411241466955},{"x":0.7836714600946715,"y":0.13898971301076918},{"x":0.9795084137301507,"y":0.3827608189275009},{"x":1,"y":0.6911735045073372},{"x":0.799871213305228,"y":0.930485490816158},{"x":0.4592086779127214,"y":1},{"x":0.16353271575696565,"y":0.8506827777086173},{"x":0.006728355920674357,"y":0.5737899975251185},{"x":0,"y":0.266899840361871},{"x":0.21930321736293767,"y":0.04361987668099705},{"x":0.5660611096044913,"y":0}]
  },
  {
    name: "line",
    points: [{"x":0,"y":0},{"x":0.5541904410717916,"y":0.09889101848183579},{"x":0.8585859648384722,"y":0.19869008314687145},{"x":0.9780321522669564,"y":0.2988005619274797},{"x":1,"y":0.3989694934685203},{"x":0.9901082587976848,"y":0.49914094841063794},{"x":0.9825130339158383,"y":0.5993125574852409},{"x":0.984131514999344,"y":0.6994844141481611},{"x":0.9869549106317261,"y":0.7996562573187733},{"x":0.9863658228951212,"y":0.8998281308086875},{"x":0.9860684289205439,"y":1}]
  },
  {
    name: "square",
    points: [{"x":0,"y":0.0288178227211964},{"x":0.3575363419134893,"y":0},{"x":0.7324419118011533,"y":0.00002857170166751494},{"x":0.9206465309517198,"y":0.22042588415195266},{"x":0.9696153056107151,"y":0.5971898245180525},{"x":1,"y":0.9736055816605559},{"x":0.6508583893560632,"y":1},{"x":0.2773342346399045,"y":0.9794489711154386},{"x":0.07518747253246082,"y":0.7851124495455876},{"x":0.03794362101017957,"y":0.40586033478133227},{"x":0.02830205826521819,"y":0.0288178227211964}]
  }
];

@Injectable()
export class ShapeRecognition {

  constructor() {}

  getAll() {
    return shapes;
  }

  getAngle(p1, p2) {
    return Math.atan2(p2.x - p1.x, p2.y - p1.y);
  }

  getAverageDiff(shapePoints, path) {
    var averageDiff;
    var diffSum;
    var diffSumX = 0;
    var diffSumY = 0;
    var nDiffs = 0;
    var relativePoints1 = this.getRelativePoints(shapePoints);
    var relativePoints2 = path;
    for(var i = 0; i < relativePoints2.length; i++) {
      try {
        var p1 = relativePoints1[i];
        var p2 = relativePoints2[i];
        var diffX = p2.x - p1.x;
        var diffY = p2.y - p1.y;
        diffSumX += diffX;
        diffSumY += diffY;
        nDiffs += 1;
      }
      catch(err) {
        console.error(err);
      }
    }
    diffSum = Math.sqrt(Math.pow(diffSumX, 2) + Math.pow(diffSumY, 2));
    averageDiff = diffSum / nDiffs;
    return averageDiff;
  }

  getClosestShape(path) {
    var closestShape;
    var relativePath = this.getRelativePoints(this.getSegmented(path));
    var firstPoint = relativePath[0];
    var lastPoint = relativePath[relativePath.length - 1];
    var traveledX = lastPoint.x - firstPoint.x;
    var traveledY = lastPoint.y - firstPoint.y;
    if(Math.abs(traveledX) + Math.abs(traveledY) > 1) {
      closestShape = this.getShapeByName('line');
    }
    else {
      let closestDistance;
      shapes.forEach(function(shape, i) {
        var distance = this.getAverageDiff(shape.points, relativePath);
        if(typeof closestDistance === 'undefined' || distance < closestDistance) {
          closestShape = shape;
          closestDistance = distance;
        }
      }.bind(this));
    }
    return closestShape;
  }

  getRelativePoints(points) {
    var boundingBox = {
      top: points[0].y,
      right: points[0].x,
      bottom: points[0].y,
      left: points[0].x
    };
    var i;
    var point;
    var relativePoints = [];
    for(i = 0; i < points.length; i++) {
      point = points[i];
      boundingBox = {
        left: Math.min(boundingBox.left, point.x),
        right: Math.max(boundingBox.right, point.x),
        bottom: Math.max(boundingBox.bottom, point.y),
        top: Math.min(boundingBox.top, point.y)
      };
    }
    for(i = 0; i < points.length; i++) {
      point = points[i];
      relativePoints.push({
        x: (point.x - boundingBox.left) / (boundingBox.right - boundingBox.left),
        y: (point.y - boundingBox.top) / (boundingBox.bottom - boundingBox.top)
      });
    }
    return relativePoints;
  }

  getSegmented(path, nSegments?) {
    var offset = 0;
    var point;
    var points = [];
    nSegments = nSegments || 10;
    for (var i = 0; i <= nSegments; i++) {
      offset = path.length * (i / nSegments);
      try {
        point = path.getPointAt(offset);
      }
      catch(error) {
        console.error(error);
      }
      points.push({
        x: point.x,
        y: point.y
      });
    }
    return points;
  }

  getShapeByName(name) {
    var shape;
    for(let i = 0; i < shapes.length; i++) {
      if(shapes[i].name === name) {
        shape = shapes[i];
        break;
      }
    }
    return shape;
  }

  relativePosition(point, shape) {
    return {
      x: point.x - shape[0].x,
      y: point.y - shape[0].y
    };
  }
}

