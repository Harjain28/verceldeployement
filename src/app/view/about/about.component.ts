import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {


  about: any;
  abouts: any;
 
  constructor(private router: Router , private api: ApiService, private location:Location) {
    this.router.getCurrentNavigation().extras.state;

   }

   ngOnInit(): void {
    this.about = history.state.data;
      if (!this.about) {
       this.getStaticPageInfo();
      }
  }

  getStaticPageInfo() {
    this.api.get('staticpageinfosection').subscribe((res: any) => {
       //console.log(res);
       this.abouts = res.sectionData[0];
       this.about = this.abouts;
    });
}

back(){
  this.location.back();
}
}
