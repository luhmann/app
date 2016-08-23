/**
 * Created by joan on 20/08/16.
 */

import { Path } from 'paper';
import { Point } from 'paper';
import { Rectangle } from 'paper';
import { PointText } from 'paper';

var nodeTypes = [
  {
    name: "wire",
    symbols: ["line"]
  },
  {
    name: 'button',
    symbols: ["circle", "square"],
    'nodered-nodename': 'inject',
    processInput: function(input?) {
      return input || false;
    }
  },
  {
    name: 'container',
    symbols: ["square"],
    processInput: function(input?) {
      return this.paths.length - 1;
    }
  },
  {
    name: 'debug log',
    symbols: ['square', 'square'],
    processInput: function(input?) {
      if(typeof input != 'undefined') {
        console.info(input);
      }
      return input;
    }
  }
];

export class Node {
  public id:string;
  public paths:Array<Path>;
  public symbols:Array<string>;
  public inputs:Array<Node>;
  public outputs:Array<Node>;
  public wires:Array<string>;
  public bounds:Rectangle;
  public timestamp:Date;
  public type:string;
  public textItem:PointText;
  constructor(node?) {
    if(typeof node != 'undefined') {
      // Create from an already existing node
      // This can be useful when changing a node's type
      this.id = node.id;
      this.paths = node.paths;
      this.symbols = node.symbols;
      this.inputs = node.inputs;
      this.outputs = node.outputs;
      this.wires = node.wires;
      this.timestamp = node.timestamp;
    }
    else {
      this.id = this.generateId();
      this.paths = [];
      this.symbols = [];
      this.inputs = [];
      this.outputs = [];
      this.wires = [];
      this.timestamp = new Date();
    }
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
    this.paths.push(path);
  }
  connectTo(node) {
    node.inputs.push(this);
    this.outputs.push(node);
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
          matches = matches && this.symbols[j] === symbols[j];
        }
      }
      if(matches) {
        console.info('Hey, this is a ' + nodeType.name + '!');
        this.type = nodeType.name;
        if(typeof nodeType['processInput'] == 'function') {
          this.processInput = nodeType['processInput'].bind(this);
        }
        if(nodeType.name == 'debug log') {
          this.textItem = new PointText({
            fillColor: 'black',
            content: '',
            point: this.getCenter(),
            style: {
              'text-align': 'center'
            }
          });
        }
        break;
      }
    }
  }

  processInput(input?) {
    return input;
  }

  // Process input and pass it to all nodes connected to the outputs
  digest(input?) {
    let value = this.processInput(input);
    if(typeof this['textItem'] != 'undefined' && typeof value != 'undefined') {
      this['textItem'].content = value.toString();
    }
    for(let i = 0; i < this.outputs.length; i++) {
      let outputNode = this.outputs[i];
      outputNode.digest(value);
    }
  }

  // Copied from Node-Red; /red/runtime/util.js
  generateId() {
    return (1+Math.random()*4294967295).toString(16);
  }

  getCenter() {
    return new Point((this.bounds.right + this.bounds.left)/2, (this.bounds.bottom + this.bounds.top)/2);
  }

}

export class DebugNode extends Node {
  public textItem:PointText;
  constructor(node?) {
    super();
    this.textItem = new PointText({
      fillColor: 'black',
      content: '',
      point: this.getCenter(),
      style: {
        'text-align': 'center'
      }
    });
  }
  getCenter() {
    return new Point((this.bounds.right + this.bounds.left)/2, (this.bounds.bottom + this.bounds.top)/2);
  }
}
