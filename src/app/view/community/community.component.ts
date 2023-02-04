import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {


  community: any;
  communitydata: any;

 
  constructor(private router: Router, private api: ApiService, private event:EventService) {
    this.router.getCurrentNavigation().extras.state;

   }

  ngOnInit(): void {
    this.community = history.state.data;
    if (!this.community) {
      this.getStaticPageInfo();
    }
  }

  getStaticPageInfo() {
    this.api.get('staticpageinfosection').subscribe((res: any) => {
       //console.log(res);
       this.communitydata = res.sectionData[15];
       this.community = this.communitydata;
    });
}

back(){
  this.event.back();
}
}
