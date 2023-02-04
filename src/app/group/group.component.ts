import { Component, OnInit } from '@angular/core';
import { DisableRightClickService } from '../services/disable-right-click';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  constructor(
    private disableCopyAndCut: DisableRightClickService,) { }

  ngOnInit(): void {
    this.disableCopyAndCut.disableCopyAndCut();
  }

}
