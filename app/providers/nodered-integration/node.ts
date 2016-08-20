/**
 * Created by joan on 20/08/16.
 */

import { Path } from 'paper';
import { Point } from 'paper';
import { Rectangle } from 'paper';

var nodeTypes = [
  {
    name: "wire",
    symbols: ["line"]
  },
  {
    name: 'button',
    symbols: ["circle", "square"],
    'nodered-node': 'node-red-contrib-nr-injector'
  }
];

export class Node {
  public id:string;
  public paths:Array<Path>;
  public symbols:Array<string>;
  public wires:Array<string>;
  public bounds:Rectangle;
  public timestamp:Date;
  public type:string;
  constructor() {
    this.id = this.generateId();
    this.paths = [];
    this.symbols = [];
    this.wires = [];
    this.timestamp = new Date();
  }
  addPath(path, symbol?) {
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
    if(typeof symbol !== 'undefined') {
      this.addSymbol(symbol);
    }
  }
  connectTo(node) {
    this.wires.push(node.id);
  }

  overlaps(path) {
    return this.bounds.intersects(path.bounds);
  }

  addSymbol(symbol) {
    this.symbols.push(symbol);
    this.symbols.sort();
    for(let i = 0; i < nodeTypes.length; i++) {
      let nodeType = nodeTypes[i];
      let symbols = nodeType.symbols;
      let matches = symbols.length == this.symbols.length;
      if(matches) {
        for(let j = 0; j < symbols.length && j < this.symbols.length; j++) {
          matches = this.symbols[j] === symbols[j];
        }
      }
      if(matches) {
        console.info('Hey, this is a ' + nodeType.name + '!');
        this.type = nodeType['node-red-node'];
        break;
      }
    }
  }

  generateId() {
    // Copied from Node-Red; /red/runtime/util.js
    return (1+Math.random()*4294967295).toString(16);
  }

}
