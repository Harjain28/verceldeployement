import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  help: any;
  helps: any;

  constructor(private router: Router , private api: ApiService, private event:EventService) {
    this.router.getCurrentNavigation().extras.state;

   }
 
  ngOnInit(): void {
    this.help = history.state.data;
      if (!this.help) {
       this.getStaticPageInfo();
      }
  }

  getStaticPageInfo() {
    this.api.get('staticpageinfosection').subscribe((res: any) => {
       //console.log(res);
       this.helps = res.sectionData[1];
       this.help = this.helps;
    });
}

back(){
  this.event.back();
}
}
