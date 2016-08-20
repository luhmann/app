/**
 * Created by joan on 20/08/16.
 */

import { Path } from 'paper';
import { Point } from 'paper';
import { Rectangle } from 'paper';

export class Node {
  public id:string;
  public paths:Array<Path>;
  public wires:Array<string>;
  public bounds:Rectangle;
  constructor() {
    this.id = this.generateId();
    this.paths = [];
    this.wires = [];
  }
  addPath(path) {
    if(typeof this.bounds === 'undefined') {
      this.bounds = path.bounds;
    }
    else {
      let x0 = Math.min(this.bounds.x, path.bounds.x);
      let x1 = Math.max(this.bounds.x + this.bounds.width, path.bounds.x + path.bounds.width);
      let y0 = Math.min(this.bounds.y, path.bounds.y);
      let y1 = Math.max(this.bounds.y + this.bounds.height, path.bounds.y + path.bounds.height);
      this.bounds = new Rectangle(new Point(x0, y0), new Point(x1, y1));
    }
  }
  connectTo(node) {
    this.wires.push(node.id);
  }

  overlaps(path) {
    return this.bounds.intersects(path.bounds);
  }

  generateId() {
    // Copied from Node-Red; /red/runtime/util.js
    return (1+Math.random()*4294967295).toString(16);
  }

}
