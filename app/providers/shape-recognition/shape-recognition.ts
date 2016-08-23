import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
// import { Path } from 'paper';
// import { Color } from 'paper';
// import { Gradient } from 'paper';

/*
  Generated class for the Shape provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

var shapes = [
  {
    name: "circle",
    points: [{"x":0.6077668082551021,"y":0.025814994798241085},{"x":0.7588525695784651,"y":0.06805774710686978},{"x":0.877309065654432,"y":0.17215439915143577},{"x":0.9579977851108715,"y":0.30796787876974846},{"x":1,"y":0.46019166966613834},{"x":0.9936616102131355,"y":0.6175635975614535},{"x":0.9291868347776355,"y":0.7618990288405011},{"x":0.8427196664252797,"y":0.8944585214666234},{"x":0.704148477047749,"y":0.9648431752815996},{"x":0.549025067023668,"y":0.9981115328401742},{"x":0.3912884133555528,"y":1},{"x":0.24773663687065836,"y":0.9350756906275902},{"x":0.13759971557206632,"y":0.8219786237265531},{"x":0.0622274639701727,"y":0.6830035231924976},{"x":0.01744818476880864,"y":0.5313228565073904},{"x":0,"y":0.37461756791673956},{"x":0.07445879091987845,"y":0.23674640235630887},{"x":0.18588096713184554,"y":0.12437777704249631},{"x":0.31961803438842856,"y":0.03977554799543632},{"x":0.47211752776056826,"y":0},{"x":0.6304190352051636,"y":0.010750783739089822}]
  },
  {
    name: "line",
    points: [{"x":0.8972030026488207,"y":0},{"x":0.9014529422362226,"y":0.05023130482806137},{"x":0.9126762298322947,"y":0.10045873754436344},{"x":0.9285979863150366,"y":0.15068154276480356},{"x":0.9469607783019621,"y":0.20090130212412124},{"x":0.9655199229781973,"y":0.2511207974102172},{"x":0.9820377413963435,"y":0.30134289954636106},{"x":0.9942777804757708,"y":0.351569469513399},{"x":1,"y":0.4018002572580382},{"x":0.9969579312666628,"y":0.4520317882736125},{"x":0.982898848387955,"y":0.5022562349685659},{"x":0.9555680307153199,"y":0.5524602814115026},{"x":0.9127182028543209,"y":0.6026240057551222},{"x":0.8521251722526669,"y":0.65271982438712},{"x":0.7641697441898805,"y":0.7026593878966524},{"x":0.6285549010774878,"y":0.7522055285335744},{"x":0.4662052271477473,"y":0.8014577042465248},{"x":0.29961233855972186,"y":0.8506580896165112},{"x":0.15058670368371255,"y":0.9000637787737694},{"x":0.04219455383026711,"y":0.9498529959453831},{"x":0,"y":1}]
  },
  {
    name: "square",
    points: [{"x":0.009050893276150841,"y":0.02245529875812056},{"x":0.18727374955146245,"y":0.02245529875812056},{"x":0.36549660582677407,"y":0.02245529875812056},{"x":0.5437194621020862,"y":0.02245529875812056},{"x":0.7219423183773973,"y":0.02245529875812056},{"x":0.900165156714007,"y":0.022383756557479054},{"x":0.9969010970079176,"y":0.12405690715454311},{"x":0.9955982603765925,"y":0.3450795602663622},{"x":0.9955982603765925,"y":0.5661653338514469},{"x":1,"y":0.7870773689377502},{"x":0.9927603514644869,"y":0.967615061454389},{"x":0.8145476119503128,"y":0.9658039433710186},{"x":0.6378165566011932,"y":0.990695725615331},{"x":0.4599641081867346,"y":1},{"x":0.28192381439057757,"y":0.990097626696715},{"x":0.10372588759091857,"y":0.9886686610282651},{"x":0.013981324630190787,"y":0.8746533728041661},{"x":0.018101786552301682,"y":0.6537704247046843},{"x":0.018101786552301682,"y":0.43268465111960003},{"x":0.018108117384584368,"y":0.2115989008403111},{"x":0,"y":0}]
  },
  {
    name: 'hourglass',
    points: [{"x":0.048916076024914074,"y":0.011494259115537886},{"x":0.3420506437402871,"y":0.011494259115537886},{"x":0.6351852114556604,"y":0.011494259115537886},{"x":0.9283197791710335,"y":0.011494259115537886},{"x":0.8875732108466401,"y":0.12439483599673688},{"x":0.7158646520608432,"y":0.27318602125252567},{"x":0.555415001499157,"y":0.4269078392334364},{"x":0.39023075721136674,"y":0.5786282709798138},{"x":0.21490217418922278,"y":0.7258200027146441},{"x":0.06244555745869438,"y":0.8826084013583453},{"x":0.0294290957460625,"y":0.9961691233466169},{"x":0.3224670625977765,"y":1},{"x":0.615576813239326,"y":0.9978119557961481},{"x":0.9086893676926082,"y":0.996604522833001},{"x":1,"y":0.8953199057387078},{"x":0.8606095570443913,"y":0.7338417038661106},{"x":0.7074428122094756,"y":0.5773826260988639},{"x":0.5377153678159304,"y":0.427625893065699},{"x":0.3803746253806696,"y":0.272949571008492},{"x":0.16941838876039608,"y":0.14599559790684521},{"x":0,"y":0}]
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

  getAverageDiff(shapePoints, path, nShape?) {
    var averageDiff;
    var diffSum;
    var diffSumX = 0;
    var diffSumY = 0;
    var nDiffs = 0;
    var relativePoints1 = this.getRelativePoints(shapePoints);
    var relativePoints2 = path;
    // nShape = nShape || 0;
    // console.log('nShape:', nShape);
    for(var i = 0; i < relativePoints1.length && i < relativePoints2.length; i++) {
      try {
        var p1 = relativePoints1[i];
        var p2 = relativePoints2[i];
        var diffX = p2.x - p1.x;
        var diffY = p2.y - p1.y;
        // console.log(Math.sqrt(diffX*diffX + diffY*diffY));
        diffSumX += Math.abs(diffX);
        diffSumY += Math.abs(diffY);
        nDiffs += 1;
        // var factor = 100;
        // var offsetX = nShape*factor*2;
        // var offsetY = 100;
        // var origin = [offsetX + factor*p1.x, offsetY + factor*p1.y];
        // var destination = [offsetX + factor*p2.x, offsetY + factor*p2.y];
        // var r = i/relativePoints1.length;
        // new Path({
        //   segments: [origin, destination],
        //   opacity: .3,
        //   strokeColor: new Color(1, r, 1 - r)
        // });
      }
      catch(err) {
        console.error(err);
      }
    }
    diffSum = Math.sqrt(diffSumX*diffSumX + diffSumY*diffSumY);
    averageDiff = diffSum / nDiffs;
    return averageDiff;
  }

  getClosestShape(path) {
    // console.log(JSON.stringify(this.getRelativePoints(this.getSegmented(path))));
    if(path.length == 0) {
      return {
        name: 'point'
      }
    }
    var closestShape;
    var relativePath = this.getRelativePoints(this.getSegmented(path));
    var firstPoint = relativePath[0];
    var lastPoint = relativePath[relativePath.length - 1];
    var traveledX = lastPoint.x - firstPoint.x;
    var traveledY = lastPoint.y - firstPoint.y;
    if(Math.abs(traveledX) + Math.abs(traveledY) >= 1) {
      closestShape = this.getShapeByName('line');
    }
    else {
      let closestDistance;
      shapes.forEach(function(shape, i) {
        var distance = this.getAverageDiff(shape.points, relativePath, i);
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
        x: (point.x - boundingBox.left) / Math.max(1, (boundingBox.right - boundingBox.left)),
        y: (point.y - boundingBox.top) / Math.max(1, (boundingBox.bottom - boundingBox.top))
      });
    }
    return relativePoints;
  }

  getSegmented(path, nSegments?) {
    var offset = 0;
    var point;
    var points = [];
    nSegments = nSegments || 20;
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

