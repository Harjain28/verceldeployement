import { Component, OnInit } from '@angular/core';
import { DisableRightClickService } from '../services/disable-right-click';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(
    private disableCopyAndCut: DisableRightClickService) { }

  ngOnInit(): void {
    this.disableCopyAndCut.disableCopyAndCut();
  }

}
