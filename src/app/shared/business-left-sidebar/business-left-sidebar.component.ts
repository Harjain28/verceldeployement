import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-business-left-sidebar',
  templateUrl: './business-left-sidebar.component.html',
  styleUrls: ['./business-left-sidebar.component.scss']
})
export class BusinessLeftSidebarComponent implements OnInit {
  branchStatus: boolean = true;
  ADDEDITBRANCHSTATUS: any;
  className: any;


  constructor(private router: Router,
    private storage: StorageService,
    private event: EventService,
    private api: ApiService) {
  }

  ngOnInit(): void {
    this.ADDEDITBRANCHSTATUS = JSON.parse(localStorage.getItem("userdata"));
    const classData = JSON.parse(localStorage.getItem('classData'));
    this.className = classData?.businessName;
    // this.data = localStorage.getItem("classData");
    // this.fulldata = JSON.parse(this.data);
    // this.branchStatus = this.ADDEDITBRANCHSTATUS?.postalCode ? true : false;
  }


}
