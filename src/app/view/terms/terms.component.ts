import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit{
  termsdata: any;
  terms: any;


  constructor(private router: Router , private api: ApiService) {
    this.router.getCurrentNavigation().extras.state;

   }

  ngOnInit(): void {
    this.termsdata = history.state.data;
     if (!this.termsdata) {
       this.getStaticPageInfo();
     }
  }

  getStaticPageInfo() {
    this.api.get('staticpageinfosection').subscribe((res: any) => {
       //console.log(res);
       this.terms = res.sectionData[2];
       this.termsdata = this.terms;
    });
}
}
