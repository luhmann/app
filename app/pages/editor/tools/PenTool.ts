/**
 * Created by benjaminskirlo1 on 15.08.16.
 */
import {Tool}                   from "paper";
import {Path}                   from "paper";
import {FirePath}               from "./FirePath";
import {FirebaseListObservable} from "angularfire2/angularfire2";
import DataSnapshot = firebase.database.DataSnapshot;
import Reference = firebase.database.Reference;
import {ToolEvent} from "paper";
import { ShapeRecognition } from '../../../providers/shape-recognition/shape-recognition';


export class PenTool extends Tool {
  private path        :Path;
  private key         :string;
  private reference   :Reference;
  constructor(
    private paths :FirebaseListObservable<any[]>,
    private shapeRecognition:ShapeRecognition
  )
  {
    super();
  }

  public onMouseDown(event :ToolEvent)
  {
    // If we produced a path before, deselect it:
    if (this.path) {
      this.path.selected = false;
    }

    this.path = new Path({
      segments: [event.point],
      strokeColor: 'black',
      // Select the path, so we can see its segment points:
      fullySelected: true
    });

    let json = this.path.exportJSON();
    let id = this.path.id;

    var firePath:FirePath = {json: json, id: id};
    this.paths.push(firePath).then(
      (response:any)=> {
        this.reference = response as Reference;
      }
    )
  }


// While the user drags the mouse, points are added to the path
// at the position of the mouse:
  public onMouseDrag(event :ToolEvent)
  {
    this.path.add(event.point);

    // Update the content of the text item to show how many
    // segments it has:

    //var json = this.path.exportJSON();
    this.savePathChanges();

  }

  private savePathChanges()
  {
    let id = this.path.id;

    if (this.reference) {
      let json = this.path.exportJSON();
      let firePath:FirePath = {json: json, id: id};
      this.reference.set(firePath);
    }
  };

// When the mouse is released, we simplify the path:
public onMouseUp(event :ToolEvent)
  {
    let segmentCount = this.path.segments.length;

    // When the mouse is released, simplify it:
    this.path.simplify(10);

    // Select the path, so we can see its segments:
    this.path.fullySelected = true;

    let newSegmentCount = this.path.segments.length;
    let difference = segmentCount - newSegmentCount;
    let percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
    this.path.selected = false;
    this.savePathChanges();
    let closestShape = this.shapeRecognition.getClosestShape(this.path);
    console.info(closestShape.name);
  }

}
