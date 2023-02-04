import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  sectionInfo: any;
  aboutUs: any;
  faceBookLink: any;
  twitterLink: any;
  instagramLink: any;
  googleLink: any;
  help: any;
  terms: any;
  contentPolicy: any;
  privacyPolicy: any;
  contactUs: any;
  Faqs: any;
  communities: any;
  currentURL: any;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getStaticPageInfo();
    this.currentURL = this.router.url;
    this.router.events.subscribe((res: any) => {
      if (res instanceof NavigationEnd) {
        this.currentURL = res.url;
        // console.log(this.currentURL);
      }
    });
  }

  getStaticPageInfo() {
    this.api.get('staticpageinfosection').subscribe((res: any) => {
      //  console.log(res);
      this.sectionInfo = res.sectionData;
      this.aboutUs = res.sectionData[0];
      this.help = res.sectionData[1];
      this.terms = res.sectionData[2];
      this.contentPolicy = res.sectionData[3];
      this.privacyPolicy = res.sectionData[4];
      this.contactUs = res.sectionData[5];
      this.Faqs = res.sectionData[6];
      this.communities = res.sectionData[15];
      this.faceBookLink = res.sectionData[11];
      this.twitterLink = res.sectionData[12];
      this.instagramLink = res.sectionData[13];
      //  console.log(this.instagramLink , "dde");
      this.googleLink = res.sectionData[14];
    });
  }


}
