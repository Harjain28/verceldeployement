import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  constructor(
    private event: EventService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.event.adminSideBarData = [];
  }

}
