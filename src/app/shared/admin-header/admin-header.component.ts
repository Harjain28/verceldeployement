import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  data: any;
  fulldata: any;
  email: any;
  name: any;
  image: any;
  type: any;
  userId: any;
  token: any;
  constructor(
    public event: EventService,
    private storage: StorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

    this.route.params.subscribe((params) => {
      localStorage.removeItem("admintoken");
      localStorage.removeItem("businessadminid");
      this.userId = params.userId;
      this.token = params.token;
      localStorage.setItem("admintoken", this.token);
      localStorage.setItem("businessadminid", this.userId);
    })
    
  }

  ngOnInit(): void {
    this.fetchAdminDetails();
  }

  fetchAdminDetails(){
    if (this.userId) {
      setTimeout(() => {
        this.data = localStorage.getItem("userData");
        this.event.adminData = this.data;
        this.fulldata = JSON.parse(this.data);
        this.email = this.fulldata?.email === 'null' ? '' : this.fulldata?.email;
        this.name = this.fulldata?.name;
        this.image = this.fulldata?.image;
        this.type = this.fulldata?.type;
      }, 3500)

      // if (!localStorage.getItem("load")) {
      //   localStorage.setItem("load", "no reload");
      //   // location.reload();
      // } else {
      //   localStorage.removeItem("load");
      // }
    } else {
      this.data = localStorage.getItem("userdata");
      this.fulldata = JSON.parse(this.data);
      this.email = this.fulldata?.email;
      this.name = this.fulldata?.name;
      this.image = this.fulldata?.image;
      this.type = this.fulldata?.type;

      // if (!localStorage.getItem("load")) {
      //   localStorage.setItem("load", "no reload");
      //   // location.reload();
      // } else {
      //   localStorage.removeItem("load");
      // }
    }
  }

  profilepageRedirect() {
    this.router.navigate([`/admin/business-profile/${this.userId}/${this.token}`])
  }

  logout() {
    this.event.businessDetails = false;
    this.storage.logout();
    this.router.navigate(["/login/student"]);
  }

}
