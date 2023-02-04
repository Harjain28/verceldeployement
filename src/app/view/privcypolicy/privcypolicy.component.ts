import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-privcypolicy',
  templateUrl: './privcypolicy.component.html',
  styleUrls: ['./privcypolicy.component.scss']
})
export class PrivcypolicyComponent implements OnInit {
  privcypolicy: any;
  privacy: any;

 
  constructor(private router: Router , private api: ApiService) {
    this.router.getCurrentNavigation().extras.state;

   }

   ngOnInit(): void {
    this.privcypolicy = history.state.data;
      if (!this.privcypolicy) {
       this.getStaticPageInfo();
      }
  }

  getStaticPageInfo() {
    this.api.get('staticpageinfosection').subscribe((res: any) => {
       //console.log(res);
       this.privacy = res.sectionData[4];
       this.privcypolicy = this.privacy;
    });
}
}
