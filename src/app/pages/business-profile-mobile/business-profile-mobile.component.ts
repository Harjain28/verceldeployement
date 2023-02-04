import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-business-profile-mobile',
  templateUrl: './business-profile-mobile.component.html',
  styleUrls: ['./business-profile-mobile.component.scss']
})
export class BusinessProfileMobileComponent implements OnInit {
  leaveGroup: boolean;
  type: any;
  email: any;
  name: any;
  image: any;
  userName: any;

  constructor(private storage:StorageService, public router:Router , public breakpointObserver: BreakpointObserver, private event:EventService) { }

  ngOnInit(): void {
    this.loginOrNot();
    if (this.router.url === '/pages/business-profle-mobile') {
      this.breakpointObserver
      .observe(['(min-width: 500px)'])
      .subscribe((state: BreakpointState) => {
        // if (state.matches) {
        //     this.router.navigate(['/pages/business-details']);
        // } else {
        //    this.router.navigate(['/pages/business-profle-mobile']);
        // }
      });
    }
   
  }

  loginOrNot() {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    this.email = userData?.email;
    this.name = userData?.name;
    this.image = userData?.image;
    this.type = userData?.type;
    this.userName = userData?.userName;
  }

  openToggle() {
    this.leaveGroup = !this.leaveGroup;
  }

  logout() {
    this.event.businessDetails = false;
    this.storage.logout();
    this.router.navigate(['/login/' + this.type]);
  }

  back(){
    this.event.back();
  }

}
