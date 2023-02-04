import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {
  panelOpenState = false;
  leaveGroup: boolean = false;
  API_URL: string;
  discussationBox: boolean;
  groupDiscussionForm: FormGroup;
  id: any;
  groupData: any = [];
  description: any;
  sectionData: any = [];
  sections: any = [];
  faqData: any = [];
  groupEventsData: any = [];
  eventData: any = [];
  groupgroupsData: any;
  groupproductData: any = [];
  productData: any = [];
  myFiles: any = [];
  images: any = [];
  index: any;
  groupDiscussionData: any = [];
  discussionData: any = [];
  loginOrNot: any;
  isSeprateDiscussion =  true;
  selected: boolean = false;
  joingroupId: any;
  type: string;
  leftgroupId: string;
  
  @ViewChild('tabs', {static: false}) tabs;
  selectedIndex: number;
  isJoinGroup: boolean = true;
  isLeaveGroup: boolean = true;
  isJoinornot: boolean = false;
  filterValue: any;
  select: boolean = false;
  userId: any;
  isLoaded:boolean = false;
  // isHidden: boolean = true;
  constructor(private api: ApiService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private storage: StorageService,
    private event: EventService) {
    this.API_URL = environment.BASE_API_ENDPOINT;
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      // console.log(this.id,'idddddddddddd');
        this.getGroups();
         this.getAllgroupsData();
    });
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
        items: 4,
      },
      940: {
        items: 4,
      }
    },
    nav: false
  };

  customOptions3: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    items: 4,
    //autoplayTimeout:2000,
    //autoplaySpeed: 1500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  };
  
  customOptions4: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    items: 4,
    //autoplayTimeout:2000,
    //autoplaySpeed: 1500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  };

  ngOnInit(): void {    
    this.selectedIndex = this.event.groupTag;
    this.formInit();
    this.loginOrNot = localStorage.getItem("LoggedIn");
    this.getGroups();
    // this.getAllgroupsData();
    // this.getdiscussionData();
    let userData = JSON.parse(localStorage.getItem('userdata'));
     this.userId = userData?._id;
  }
  selectedTabChange(event) {
    this.event.groupTag = event.index;
    // console.log('tab changrd', tabVal.index);
  }

  formInit() {
    this.groupDiscussionForm = new FormGroup({
      title: new FormControl("", {
        validators: [Validators.required]
      }),
      description: new FormControl("", [
        Validators.required,
      ]),
      image: new FormControl(''),
    });
  }

  onTabClick(event) {
    this.filterValue = event.tab.textLabel;
    // console.log(this.filterValue);
  }

  // getdiscussionData() {
  //   this.api.get("getreply").subscribe((res: any) => {
  //     console.log(res, "getdiscussionData")
  //   });
  // }

  getAllgroupsData() {
    const userData = JSON.parse(localStorage.getItem('userdata'));
      this.http.get(`${this.API_URL}groupDetailsbyId?groupsId=` + this.id)
        .subscribe((res: any) => {
          // console.log(res, "groupDetailsbyId");
          this.groupData = res.searchData[1].faqData;
          this.groupEventsData = res.searchData[0].eventData;
          this.groupDiscussionData = res.searchData[2].discussionData;
          this.groupDiscussionData.forEach(element => {
            element.likedId.forEach(id => {
              if (id === this.userId) {
                element.selected = true;
              } else {
                element.selected = false;
              }
            });
          });  
          this.groupgroupsData = res.searchData[0].groupsData;
          for (let i = 0; i <= this.groupgroupsData?.userId.length; i++) {
            if (this.groupgroupsData?.userId[i] === userData?._id) {
              this.selected = true;
              this.isJoinornot = true;
            }
          }
          this.groupproductData = res.searchData[0].productData;
          // Faqs Data 
          this.groupData.forEach((element: any) => {
            this.faqData.push(...element.faqData);
          });
          // Event Data 
          this.groupEventsData.forEach((element: any) => {
            this.eventData.push((element))
          });
          // Market Place Data
          this.groupproductData.forEach((element: any) => {
            this.productData.push((element))
          });
          // this.description = this.groupData.groupDescription;
          this.isLoaded = true;
        });  
  }

  getGroups() {
    this.api.get("groupdetailssection?groupsId=" + this.id).subscribe((res: any) => {
      this.sectionData = res.description;
      // console.log(this.sectionData, "sectionData");
      // this.sectionData.forEach((item: any) => {
      //   this.sections.push({ sectionname: item.sectionname, title: item.title, sectionValue: item.section })
      // })
    });
  }

  checkLoginorNot() {
    if (!this.storage.isLoggednIn()) {
      this.router.navigate(["/login/student"]);
    }
  }

  copyToClipboard() {
    if (this.storage.isLoggednIn()) {
      this.event.copyClipboard();
      this.api.alert('Link Copied', 'success');
    }
  }

  showMoreData(sectiontitle: any) {
    let DetailType =  'forgroups'
    this.router.navigate(["/Related-More/" +  DetailType + '/' + this.id + '/' + sectiontitle]);
  }

  getArticeDetails(id: any) {
    this.router.navigate(["/articles-details/" + id]);
  }
  getSeparateDiscussionDetails(id: any) {
    this.router.navigate(["/separate-discussions/" + id + '/' + this.groupgroupsData?.groups + '/' + this.id]);
  }
  getGroupDetails(id: any) {
    this.router.navigate(["/group-details/" + id]);
  }
  getEventsDetails(id: any) {
    this.router.navigate(["/event-details/" + id ]);
  }
  getClassDetails(id: any) {
    let newId = atob(id);
    this.router.navigate(["/view/class-details/" + newId]);
  }
  getMarketPlaceDetails(id: any) {
    this.router.navigate(["/view/marketplace-details/" + id]);
  }

  openToggle() {
    this.leaveGroup = !this.leaveGroup;
  }

  openToggle2() {
    if (this.isJoinornot) {
      this.discussationBox = !this.discussationBox;
    } else {
      this.api.alert('Please join the Group' , "error");
    }
  }

  onFileChange(event: any) {
    // console.log(event);
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
      var reader = new FileReader();

      reader.onload = (event: any) => {
        // console.log(event);
        this.images.push(event.target.result);
        // console.log(this.images);
      };
      reader.readAsDataURL(event.target.files[i]);
    }
  }

  deleteImage(i: any): void {
    // console.log(i);
    this.index = i;
    (<HTMLInputElement>document.getElementById(`upLoader${i}`)).value = '';
    this.images.splice(i, 1);
    this.myFiles.splice(i, 1);
  }
 
  groupDiscussionPostForm() {
    const formValue = this.groupDiscussionForm.value;
    const formData: FormData = new FormData();
    if (formValue.title && formValue.title.trim() !== '') {
    formData.append("groupId", this.groupgroupsData._id);
    formData.append("title", formValue.title);
    formData.append("description", formValue.description);
    // console.log(this.groupDiscussionForm);
    if (this.groupDiscussionForm.valid) {
        this.isSeprateDiscussion = false;
      for (var i = 0; i < this.myFiles.length; i++) {
        formData.append("image", this.myFiles[i]);
      }
      const headers = new HttpHeaders({
        Authorization: localStorage.getItem("LoggedIn"),
      });
      this.http.post(`${this.API_URL}creatediscussion`, formData, { headers: headers, }).subscribe((res: any) => {
        // console.log(res); 
        if (res.status == true) {
          this.discussationBox = false;
          this.groupDiscussionForm.reset();
          this.images = [];
          this.myFiles = [];
          this.isSeprateDiscussion = true;
          this.getAllgroupsData();
        } else  {
          this.api.alert(res.message, "error");
          this.isSeprateDiscussion = true;
        }
      });
    } else {
      this.groupDiscussionForm.markAllAsTouched();
       this.isSeprateDiscussion = false;
    }
  }
  }

  joinGroup(groupId: any) {
    this.checkLoginorNot();
    let requestData = {};
    this.joingroupId = groupId;
    this.type = 'join';
    requestData['groupId'] = groupId;
    requestData['type'] = 'join';
    this.isJoinGroup = false;
    this.api.post('joingroups', requestData).subscribe((res: any) => {
      // console.log(res);
      if (res.status == true) {
        this.getAllgroupsData();
        this.isJoinGroup = true;
        this.isJoinornot = true;
          if (this.groupgroupsData?._id === groupId) {
            this.selected = true;          
        }
      } else {
        this.api.alert(res.message, 'error')
        this.isJoinGroup = false;
      }
    });
  }

  LeaveGroup(groupId: any) {
    this.checkLoginorNot();
    let requestData = {};
    this.leftgroupId = groupId;
    this.type = 'left'
    requestData['groupId'] = groupId;
    requestData['type'] = 'left';
    this.isLeaveGroup = false;
    this.api.post('joingroups', requestData).subscribe((res: any) => {
      // console.log(res);
      if (res.status == true) {
        this.getAllgroupsData();
        this.isLeaveGroup = true;
        this.isJoinornot = false;
        if (this.groupgroupsData?._id === groupId) {
          this.leaveGroup = !this.leaveGroup;
          this.selected = false;
      }
      } else {
        this.api.alert(res.message, 'error');
        this.isLeaveGroup = false;
      }
    });
  }
  back(){
    this.event.back();
  }
}
