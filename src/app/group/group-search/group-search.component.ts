
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-group-search',
  templateUrl: './group-search.component.html',
  styleUrls: ['./group-search.component.scss']
})
export class GroupSearchComponent implements OnInit {

  sectionData: any = [];
  sections: any = [];
  joingroup: boolean = true;
  groupId: any;
  joingroupId: any;
  leftgroupId: any;
  type: string;
  loginOrNot: string;
  searchvalue: any;
  groupData: any = [];
  groupsearchData: any;
  isJoingroup: boolean = true;
  clearIcon: boolean = false;

  constructor(private api: ApiService,
    private router: Router,
    private storage: StorageService, private event:EventService) {
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    autoWidth: true,
    items: 4,
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      }
    },
    nav: false
  }

  ngOnInit(): void {
    this.loginOrNot = localStorage.getItem("LoggedIn");
    this.getGroupsection();
  }

  onSearchGrouopsbyName() {
    this.clearIcon = true;
    if (this.searchvalue.length === 0) {
      this.clearIcon = false;
    }
    const userData = JSON.parse(localStorage.getItem('userdata'));
    if (this.searchvalue && this.searchvalue.trim() !== '') {
      this.api.get("searchontype?type=groups&text=" + this.searchvalue).subscribe((res: any) => {
        this.groupsearchData = res.data;
        this.groupsearchData = this.groupsearchData.filter(othergroup => othergroup.groups != 'other');
        // this.isJoingroup = false;

        this.groupsearchData.forEach(element => {
          if (element?._id === this.joingroupId) {
            element.selected = true;
            this.isJoingroup = true;
          }
          element.userId.forEach(userid => {
            if (userid === userData?._id) {
              element.selected = true;
              this.isJoingroup = true;
            }
          });
        });
        // console.log('this is groip serach data',this.groupsearchData);
      });
    }
  }

  getGroupsection() {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    this.api.get("groupsection").subscribe((res: any) => {
      this.sectionData = res.description;
      this.sectionData.forEach(function (groups) {
        groups.section = groups.section.filter(othergroup => othergroup.groups != 'other');
      });
      // console.log(this.sectionData, "sectionData")
      for (let i = 0; i <= this.sectionData.length; i++) {
        for (let j = 0; j < this.sectionData[i]?.section.length; j++) {
          if (this.sectionData[i].section[j]?._id === this.joingroupId && this.type === 'join') {
            this.sectionData[i].section[j].selected = true;
          } else if (this.sectionData[i].section[j]?._id === this.leftgroupId && this.type === 'left') {
            this.sectionData[i].section[j].selected = false;
          } for (let k = 0; k <= this.sectionData[i].section[j].userId.length; k++) {
            if (this.sectionData[i].section[j].userId[k] === userData?._id) {
              this.sectionData[i].section[j].selected = true;
            }
          }
        }
      }
    });
  }

  getGroupDetails(id: any) {
    this.router.navigate(["/group-details/" + id]);
  }
  clearData() {
    this.searchvalue = '';
    this.clearIcon = false;
  }
  checkLoginorNot() {
    if (!this.storage.isLoggednIn()) {
      this.router.navigate(["/login/student"]);
    }
  }

  joinGroup(groupData: any) {
    this.checkLoginorNot();
    let requestData = {};
    this.joingroupId = groupData._id
    this.type = 'join';
    requestData['groupId'] = groupData._id;
    requestData['type'] = 'join';
    this.isJoingroup = false;
    this.api.post('joingroups', requestData).subscribe((res: any) => {
      // console.log(res);
      if (res.status == true) {
        this.isJoingroup = true;
        if (!this.searchvalue) {
          for (let i = 0; i <= this.sectionData.length; i++) {
            for (let j = 0; j < this.sectionData[i].section.length; j++) {
              if (this.sectionData[i].section[j]?._id === groupData._id) {
                this.sectionData[i].section[j].selected = true;
                this.getGroupsection();
                this.api.alert(res.message, 'success')
              }
            }
          }
        } else {
          this.groupsearchData.forEach(element => {
            if (element?._id === groupData._id) {
              element.selected = true;
              this.isJoingroup = true;
              this.getGroupsection();
              this.api.alert(res.message, 'success')
            } else {
              element.selected = false;
            }
          });
        }
      } else {
        this.api.alert(res.message, 'error')
        this.isJoingroup = false;
      }
    });
  }

  back(){
    this.event.back();
  }
}
