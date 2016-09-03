import { PopoverController } from 'ionic-angular';
import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  templateUrl: 'build/providers/node-dialog-provider/node-dialog.html'
})
export class NodeDialog {
  constructor(private popoverCtrl: PopoverController) {

  }
}
