import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit {
  type: string;
  leaveGroup: boolean;

  constructor(public router:Router) {

   }

  ngOnInit(): void {
     let usertype = JSON.parse(localStorage.getItem('userdata'));
     if (usertype) {
      this.type = usertype.type;
     }
    // console.log(this.type);
  }

  profilepageRedirect() {
    if (this.type == "business") {
      this.router.navigate(["/pages/business-profle-mobile"]);
    } else if (this.type == "subbusiness") {
      this.router.navigate(["/pages/business-profle-mobile"]);
    } else {
      this.router.navigate(["/profile/profile"]);
    }
    // if (this.type == "business") {
    //   this.router.navigate(["/pages/business-profle-mobile"]);
    // } else if (this.type == "subbusiness") {
    //   this.router.navigate(["/pages/business-profle-mobile"]);
    // } else {
    //   this.router.navigate(["/profile/profile"]);
    // }
  }

  openToggle() {
    this.leaveGroup = !this.leaveGroup;
  }

}
