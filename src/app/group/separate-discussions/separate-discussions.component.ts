import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-separate-discussions',
  templateUrl: './separate-discussions.component.html',
  styleUrls: ['./separate-discussions.component.scss']
})
export class SeparateDiscussionsComponent implements OnInit {
  discussionId: any;
  discussionreplyId: any;
  discussionData: any;
  submitMainDiscussionForm: FormGroup;
  myFiles: string[] = [];
  myFiles1: any = [];
  images1: any = [];
  images: any = [];
  index: any;
  API_URL: any;
  groupsName: any;
  groupId: any;
  sectionData: any = [];
  pipupImage: any;
  selected: boolean = false;
  likeAdded: boolean;
  userId: any;
  select: boolean = false;
  issubmitBool: boolean = false;
  showDeleteModal: boolean;
  __Id: any;

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
  id: string;

  constructor(
    private api: ApiService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private storage: StorageService,
    private event:EventService
  ) {
    this.API_URL = environment.BASE_API_ENDPOINT;

    this.route.params.subscribe((params) => {
      this.groupId = params["groupId"];
      this.discussionId = params["discussionId"];
      this.groupsName = params['groupName'];
      this.getReplyData();
      this.getSectionofGroup();
    });
  }

  ngOnInit(): void {
    this.formInitMainDiscussionForm();
    let userdata = JSON.parse(localStorage.getItem('userdata'));
    this.userId = userdata?._id;
  }

  getReplyData() {
    let requestData = {};
    requestData["discussionId"] = this.discussionId
    this.api
      .get(`getdicussionreply?discussionId=${this.discussionId}`)
      .subscribe((res: any) => {
        // console.log(res, "groupDetailsbyId");
        this.discussionData = res.data;
        this.discussionData.likedId.forEach(id => {
          if (id === this.userId) {
            this.select = true;
          } else {
            this.select = false;
          }
        });
        this.discussionData?.discussionreply.forEach(element => {
          element.likedId.forEach(id => {
            if (id === this.userId) {
              element.selected = true;
            } else {
              element.selected = false;
            }
          });

        });
        this.discussionData?.discussionreply.forEach(element => {
          // console.log(element, 'testing1');
          if (element.userId !== null) {
            if (element.userId._id === this.userId) {
              element.deleted = true;
            } else {
              element.deleted = false;
            }
          }
        });
        return this.discussionData.discussionreply.sort((a: any, b: any) => {
          return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
        });
      });
  }

  // get sortByLastModifiedDesc() {
  //   return this.discussionData.discussionreply.sort((a: any, b: any) => {
  //     return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);

  //   });
  // }

  formInitMainDiscussionForm() {
    this.submitMainDiscussionForm = new FormGroup({
      file: new FormControl(''),
      description: new FormControl(''),
    });
  }

  // formInitReplyDiscussionForm() {
  //   this.submitMainDiscussionForm = new FormGroup({
  //     file: new FormControl(''),
  //     selectedlevel: new FormControl([], Validators.required),
  //   });
  // }

  addtolikedReply(discussionId: any, type: any) {
    this.likeAdded = true;
    if (type === 'likedMain' || type === 'unlikedMain') {
      if (this.discussionData?._id === discussionId) {
        if (type === 'likedMain') {
          this.select = true;
        } else {
          this.select = false;
        }
      }
    } else {
      this.discussionData?.discussionreply.forEach(element => {
        if (discussionId === element?._id) {
          if (type === 'likedreply') {
            element.selected = true;
          } else {
            element.selected = false;
          }
        }
      });
    }

    let requestData = {};
    if (type === 'likedMain' || type === 'unlikedMain') {
      requestData["type"] = type;
      requestData["discussionId"] = discussionId;
    } else {
      requestData["innerObjId"] = discussionId;
      requestData["type"] = type;
      requestData["discussionId"] = this.discussionData?._id;
    }

    if (this.storage.isLoggednIn()) {
      this.api.post('likedicussion', requestData).subscribe((res: any) => {
        // console.log(res, 'api response');
        if (res.status) {
        } else {
          this.api.alert('Api Error', 'error');
        }

      })
    } else {
      this.router.navigate(['/login/student']);
    }
  }

  deleteItem(id: any) {
    this.__Id = id;
    this.showDeleteModal = true;
  }

  hideDeleteModal() {
    this.showDeleteModal = false;
  }

  deleteProgrammsDetails() {
    let requestData = {};
    requestData["discussionId"] = this.discussionData?._id;
    requestData["dicussionReplyId"] = this.__Id;
    this.showDeleteModal = false;
    this.api.post("deletedicussion", requestData).subscribe((res: any) => {
      if (res.status == true) {
        this.getReplyData();
        // this.programData = this.programData.filter((item: any) => {
        //   return item.id !== this.__Id;
        // })
      }
      // console.log(res, 'delete reply response');
    })
    // this.showDeleteModal = false;
  }

  onFileChange1(event, id) {
    this.myFiles1 = [];
    this.images1 = [];
    // console.log('this.images selected', id);
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles1.push(event.target.files[i]);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.images1.push(event.target.result);
        for (let i = 0; i < this.discussionData.discussionreply.length; i++) {
          if (this.discussionData.discussionreply[i]._id === id) {
            this.discussionData.discussionreply[i].selected = true;
            // this.favadded = false;
          }
        }
      };
      // console.log('this images selected..', this.images1);
      reader.readAsDataURL(event.target.files[i]);
    }
  }

  deleteImage1(i: any): void {
    // console.log(i);
    this.index = i;
    this.images1.splice(i, 1);
    this.myFiles1.splice(i, 1);
    (<HTMLInputElement>document.getElementById(`upLoader${i}`)).value = '';
  }

  onFileChange(event) {
    this.images = [];
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
      var reader = new FileReader();
      // console.log(this.images);
      reader.onload = (event: any) => {
        this.images.push(event.target.result);
      };
      reader.readAsDataURL(event.target.files[i]);
    }
  }

  openModal(image: any) {
    this.pipupImage = image;
    document.getElementById('imgModal').style.display = "block";
  }

  closeModal() {
    document.getElementById('imgModal').style.display = "none";
  }

  deleteImage(i: any): void {
    // console.log(i);
    this.index = i;
    this.images.splice(i, 1);
    this.myFiles.splice(i, 1);
    (<HTMLInputElement>document.getElementById(`upLoader${i}`)).value = '';
  }

  checkLoginorNot() {
    if (!this.storage.isLoggednIn()) {
      this.router.navigate(["/login/student"]);
    }
  }

  
  showMoreData(sectiontitle: any) {
    let DetailType =  'forgroups'
    this.router.navigate(["/Related-More/" +  DetailType + '/' + this.groupId + '/' + sectiontitle]);
  }

  getSectionofGroup() {
    this.api.get("groupdetailssection?groupsId=" + this.groupId).subscribe((res: any) => {
      this.sectionData = res.description;
      // console.log(this.sectionData, "sectionData");
    });
  }

  getArticeDetails(id: any) {
    this.router.navigate(["/articles-details/" + id]);
  }
  getGroupDetails(id: any) {
    this.router.navigate(["/group-details/" + id]);
  }
  getEventsDetails(id: any) {
    this.router.navigate(["/event-details/" + id]);
  }
  getClassDetails(id: any) {
    let newId = atob(id);
    this.router.navigate(["/view/class-details/" + newId]);
  }
  getMarketPlaceDetails(id: any) {
    this.router.navigate(["/view/marketplace-details/" + id]);
  }

  submitMainDiscussion(replieduserId: string) {
    this.checkLoginorNot();
    if (this.submitMainDiscussionForm.value.description.length > 0) {
      this.issubmitBool = true;
      // console.log(this.submitMainDiscussionForm.value, 'form values')
      const formValue = this.submitMainDiscussionForm.value;
      const formData: FormData = new FormData();
      formData.append("description", formValue.description);
      formData.append("discussionId", this.discussionId);
      if (this.myFiles.length > 0) {
        for (var i = 0; i < this.myFiles.length; i++) {
          formData.append("image", this.myFiles[i]);
        }
      }
      if (this.myFiles1.length > 0) {
        for (var i = 0; i < this.myFiles1.length; i++) {
          formData.append("image", this.myFiles1[i]);
        }
      }
      if ((formValue.description && formValue.description.trim() !== '') || this.myFiles.length > 0 || this.myFiles1.length > 0) {
        if (replieduserId) {
          formData.append("replieduserId", replieduserId);
          const headers = new HttpHeaders({
            Authorization: localStorage.getItem("LoggedIn"),
          });
          this.http.post(`${this.API_URL}replydiscussion`, formData, { headers: headers, }).subscribe((res: any) => {
            // console.log(res);
            this.discussionData = res.data;
            this.issubmitBool = false;
            if (res.status == true) {
              this.images1 = [];
              this.images = [];
              this.myFiles = [];
              this.myFiles1 = [];
              this.submitMainDiscussionForm.reset();
              this.getReplyData();
              // this.router.navigate(["pages/business-profile"]);
            } else {
              this.api.alert(res.message, "error");
              this.issubmitBool = false;
            }
          });
        } else {
          const headers = new HttpHeaders({
            Authorization: localStorage.getItem("LoggedIn"),
          });
          this.http.post(`${this.API_URL}replydiscussion`, formData, { headers: headers, }).subscribe((res: any) => {
            // console.log(res);
            this.discussionData = res.data;
            this.issubmitBool = false;
            if (res.status == true) {
              this.images = [];
              this.myFiles = [];
              this.submitMainDiscussionForm.reset();
              this.getReplyData();
              // this.router.navigate(["pages/business-profile"]);
            } else {
              this.api.alert(res.message, "error");
              this.issubmitBool = false;
            }
          });
        }
      } else {
        this.submitMainDiscussionForm.markAllAsTouched();
        this.issubmitBool = false;
      }
    } else { }
  }
  back(){
    this.event.back();
  }
}
