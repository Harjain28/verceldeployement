import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-business-branch-edit',
  templateUrl: './business-branch-edit.component.html',
  styleUrls: ['./business-branch-edit.component.scss']
})
export class BusinessBranchEditComponent implements OnInit {

  constructor(private event:EventService) { }

  ngOnInit(): void {
  }

  back(){
    this.event.back();
  }
}
