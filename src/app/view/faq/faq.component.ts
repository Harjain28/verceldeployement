import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faq: any;
  faqs: any;

 
  constructor(private router: Router, private api: ApiService, private event:EventService) {
    this.router.getCurrentNavigation().extras.state;

   }

 
   ngOnInit(): void {
    this.faq = history.state.data;
      if (!this.faq) {
       this.getStaticPageInfo();
      }
  }

  getStaticPageInfo() {
    this.api.get('staticpageinfosection').subscribe((res: any) => {
       //console.log(res);
       this.faqs = res.sectionData[6];
       this.faq = this.faqs;
    });
}

back(){
  this.event.back();
}

}
