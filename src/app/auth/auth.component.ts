import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { StorageService } from '../services/storage.service';
import { EventService } from '../services/event.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  currentURL: string;
  userData: any;
  backArrow: string;
  showOnClaim: boolean = false;
  restEventSubscription: Subscription;

  constructor(
    public router: Router,
    private location: Location,
    private event: EventService,
    private storage: StorageService) {
      this.restEventSubscription = this.event.getShowArrow().subscribe(() => {
        this.ngOnInit();
        // this.getbusinessDetails();
      });
    this.getData();
  }

  getData() {
    this.userData = localStorage.getItem('userType');
    this.backArrow = sessionStorage.getItem("backArrow");
  }

  ngOnInit(): void {
    this.currentURL = this.router.url;
    this.showArrowOnClaim();
    this.router.events.subscribe((res: any) => {
      if (res instanceof NavigationEnd) {
        this.currentURL = res.url;
      }
      //  this.redirectTologin();
    });

  }

  // redirectTologin() {
  //   if (this.event.verified) {
  //     this.router.navigate(["/pages/business-profile"]);
  //   } else {
  //     this.router.navigate(["/email-verify"]);
  //   }

  // }
  // redirectToRegsiter() {
  //   this.router.navigate(['/register/' + this]);
  // }

  showArrowOnClaim(){
    if (this.currentURL === '/claim') {
      this.showOnClaim = true;
    }else{
      this.showOnClaim = false;
    }
  }

  back() {
    this.event.sendEditEvent();
    if (this.currentURL === '/login/business' || '/login/student') {
      this.router.navigate(['/']);
    } else {
      this.location.back();
    }
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem("backArrow");
  }

}
