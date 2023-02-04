import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contact-greet',
  templateUrl: './contact-greet.component.html',
  styleUrls: ['./contact-greet.component.scss']
})
export class ContactGreetComponent implements OnInit {
  contacts: any = '';

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getStaticPageInfo();
  }

  getStaticPageInfo() {
    this.api.get('staticpageinfosection').subscribe((res: any) => {
      this.contacts = res?.sectionData[16]?.description;
    });
  }

}
