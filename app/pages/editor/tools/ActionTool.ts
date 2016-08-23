/**
 * Created by joan on 23/08/16.
 */
import { Tool } from 'paper';
import { ToolEvent } from 'paper';
import { NodeRecognition } from '../../../providers/node-recognition/node-recognition';

export class ActionTool extends Tool {
  constructor(
  ) {
    super();
  }

  public onMouseUp(event: ToolEvent) {
    console.log('onMouseUp');
    this.onTouch();
  }

  public onTouch() {
    // To be overriden
  }

}
