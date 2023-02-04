import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-contentpolicy',
  templateUrl: './contentpolicy.component.html',
  styleUrls: ['./contentpolicy.component.scss']
})
export class ContentpolicyComponent implements OnInit {

  contentpolicy: any;
  contentPolicy: any;

 
  constructor(private router: Router , private api: ApiService, private event:EventService) {
    this.router.getCurrentNavigation().extras.state;

   }

  ngOnInit(): void {
    this.contentpolicy = history.state.data;
      if (!this.contentPolicy) {
       this.getStaticPageInfo();
      }
  }

  getStaticPageInfo() {
    this.api.get('staticpageinfosection').subscribe((res: any) => {
       //console.log(res);
       this.contentPolicy = res.sectionData[3];
       this.contentpolicy = this.contentPolicy;
    });
}
back(){
  this.event.back();
}

}
