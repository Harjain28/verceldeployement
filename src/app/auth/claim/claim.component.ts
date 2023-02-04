import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss']
})
export class ClaimComponent implements OnInit, OnDestroy {
  claimMessage: any = '';
  showPage: string;

  constructor(private api: ApiService,private router: Router,  private event: EventService,) { }

  ngOnInit(): void { 
    this.event.sendShowArrow();
    this.showPage = sessionStorage.getItem("showClaim");
      if (this.showPage === null) {
        this.router.navigate(["/"]);
      }
    this.getInfoText();
  }

  getInfoText() {
    this.api.getInfoSection().subscribe((res: any) => {
        this.claimMessage = res?.sectionData[35]?.description;
    });
  }
  
  ngOnDestroy(): void{
    sessionStorage.removeItem("showClaim");
  }

}

