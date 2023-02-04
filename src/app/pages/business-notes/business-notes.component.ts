import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-business-notes',
  templateUrl: './business-notes.component.html',
  styleUrls: ['./business-notes.component.scss']
})
export class BusinessNotesComponent implements OnInit {

  constructor(private event:EventService) { }

  ngOnInit(): void {
  }

  back(){
    this.event.back();
  }
}
