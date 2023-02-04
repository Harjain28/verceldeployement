import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SelectAutocompleteComponent } from "mat-select-autocomplete";
import { take } from "rxjs/operators";
import { ApiService } from "src/app/services/api.service";
import { EventService } from "src/app/services/event.service";
import { ImageCompressService } from "src/app/services/image-compress.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-add-gallery",
  templateUrl: "./add-gallery.component.html",
  styleUrls: ["./add-gallery.component.scss"],
})
export class AddGalleryComponent implements OnInit {
  @ViewChild('firstName') firstNameRef: ElementRef;
  myFiles: any[] = [];
  newteacher: boolean;
  myForm: FormGroup;
  API_URL: string;
  images: any = [];
  classId: any;
  url: any;

  @ViewChild(SelectAutocompleteComponent)
  multiSelect: SelectAutocompleteComponent;
  options = [];
  selectedOptions = [];
  selected = this.selectedOptions;
  showError = false;
  errorMessage = "";
  selectedMessage: any;
  allbranchData: any = [];
  data: string;
  fulldata: any;
  adminId: any;
  albumImage: any;
  classdetails: any;
  class: any;
  id: any;
  albumData: any;
  imagesDefault: any = [];
  imagesMutating: any = [];
  index: any;
  albumName: any;
  adminType: string;
  diabledFeilds: boolean;
  BranchadminId: any;
  userName: any;
  branchName: any;
  isSubmitBool: boolean = false;

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private event: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private compressImage: ImageCompressService
  ) {
    this.API_URL = environment.BASE_API_ENDPOINT;
    this.adminType = localStorage.getItem('__admintype')
    this.diabledFeilds = this.adminType == "subadmin" ? true : false;
    if (this.adminType == "admin") {
      this.diabledFeilds = false;
    } else if (this.adminType == "subadmin") {
      this.diabledFeilds = true;
    } else {
      this.diabledFeilds = false;
    }
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      if (this.id) {
        let requestData = {};
        requestData["type"] = ""
        requestData["id"] = this.id
        this.api.post("getdatabyid", requestData).subscribe((res: any) => {
          //console.log(res)
          this.albumData = res?.data;
          this.albumName = this.albumData?.albumName == 'undefined' ? "" : this.albumData?.albumName;
          this.imagesDefault = this.albumData?.image;
          this.selectedOptions = this.albumData?.userId.map((item: any) => { return item }).slice(1)
        });
      }
    });
  }

  ngOnInit(): void {
    this.data = localStorage.getItem("userdata");
    this.fulldata = JSON.parse(this.data);
    this.userName = this.fulldata.name;
    this.branchName = this.fulldata.branchName;
    this.adminId = this.fulldata._id;
    this.BranchadminId = this.fulldata.admin_id;
    this.getBranchdetails();
    this.getbusinessDetails();
    this.formInit();
  }

  formInit() {
    this.myForm = new FormGroup({
      albumname: new FormControl(this.albumName),
      file: new FormControl(''),
      Selected: new FormControl([])
    });
  }

  onToggleDropdown() {
    this.multiSelect.toggleDropdown();
  }

  getSelectedOptions(selected) {
    this.selected = selected;
  }

  onResetSelection() {
    this.selectedOptions = [];
  }

  getBranchdetails() {
    this.api.get("getBranchlisting").subscribe((res: any) => {
      this.allbranchData = res.branchDetails;
      this.allbranchData.forEach((element: any) => {
        this.options.push({
          value: element._id,
          display: element.branchName,
        });
      });
    });
  }

  deleteImage(i: any): void {
    this.index = i;
    (<HTMLInputElement>document.getElementById(`upLoader${i}`)).value = '';
    this.images.splice(i, 1);
    this.myFiles.splice(i, 1);
  }

  deleteEditImage(i: any): void {
    this.imagesDefault.splice(i, 1);
  }

  onFileChange(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      let image: File = event.target.files[i];
    this.compressImage.compress(image)
      .pipe(take(1))
      .subscribe(compressedImage => {
        // now you can do upload the compressed image 
          this.myFiles.push(compressedImage);
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.images.push(event.target.result);
            setTimeout(() => {this.firstNameRef.nativeElement.focus()}, 500);
          };
          reader.readAsDataURL(compressedImage);
        
      })
    }

  }

  getbusinessDetails() {
    this.api.getBusineesdetails().subscribe((res: any) => {
      this.classdetails = res.results[1].classDetails;
      this.classdetails.forEach(element => {
        this.class = element.businessName;
        this.classId = element._id;
      });
    });
  }

  submit() {
    this.isSubmitBool = true;
    if (this.adminType == "subadmin") {
      this.myForm.get('Selected').clearValidators();
      this.myForm.get('Selected').updateValueAndValidity();
    } else {
      this.myForm.get('Selected').setValidators([Validators.required]);
      this.myForm.get('Selected').updateValueAndValidity();
    }
    const formvalue = this.myForm.value;
    const formData: FormData = new FormData();
    if (this.imagesDefault.length > 0) {
      this.myForm.get('file').clearValidators();
      this.myForm.get('file').updateValueAndValidity();
    } else if (this.myFiles.length > 0) {
      this.myForm.get('file').clearValidators();
      this.myForm.get('file').updateValueAndValidity();
    } else if (this.myFiles.length == 0 && this.imagesDefault.length == 0) {
      this.myForm.get('file').setValidators([Validators.required]);
      this.myForm.get('file').updateValueAndValidity();
    } else {
      this.myForm.get('file').setValidators([Validators.required]);
      this.myForm.get('file').updateValueAndValidity();
    }

    if (this.adminType == "admin") {
      formData.append("adminId", this.selected ? [this.adminId, ...formvalue.Selected].join(",") : [this.adminId, ...this.selected].join(","));
      formData.append("usertype", '');
      formData.append("classId", this.classId);
      formData.append("type", 'admin')
    } else if (this.adminType == 'subadmin') {
      formData.append("adminId", [this.adminId, this.BranchadminId].join(","));
      formData.append("usertype", 'subadmin')
      formData.append("createdby", this.branchName)
      formData.append("classId", this.adminId);
      formData.append("type", 'subadmin')
    } else {
      formData.append("adminId", this.selected ? [this.adminId, ...formvalue.Selected].join(",") : [this.adminId, ...this.selected].join(","));
      formData.append("usertype", '');
      formData.append("type", 'admin')
      formData.append("classId", this.classId);
    }
    formData.append("albumName", formvalue.albumname);
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("LoggedIn"),
    });

    if (this.id) {
      for (var i = 0; i < this.imagesDefault.length; i++) {
        formData.append("image", this.imagesDefault[i]);
      }
      for (var i = 0; i < this.myFiles.length; i++) {
        formData.append("images", this.myFiles[i]);
      }
      formData.append("albumId", this.id);
      if (this.myForm.valid) {
        this.http
          .post(`${this.API_URL}editgallery`, formData, { headers: headers })
          .subscribe((res: any) => {
            if (res.status == true) {
              this.isSubmitBool = false;
              this.event.businessDetails = false;
              this.router.navigate(["/pages/gallery"]);
            } else {
              this.isSubmitBool = false;
              this.api.alert(res.message, "error");
            }
          });
      } else {
        this.isSubmitBool = false;
        this.myForm.markAllAsTouched();
      }
    } else {
      for (var i = 0; i < this.myFiles.length; i++) {
        formData.append("image", this.myFiles[i]);
      }
      if (this.myForm.valid) {
        this.http
          .post(`${this.API_URL}addgallery`, formData, { headers: headers })
          .subscribe((res: any) => {
            if (res.status == true) {
              this.isSubmitBool = false;
              this.event.businessDetails = false;
              this.router.navigate(["/pages/gallery"]);
            } else {
              this.api.alert(res.message, "error"); 
              this.isSubmitBool = false;
            }
          });
      } else {
        this.myForm.markAllAsTouched();
        this.isSubmitBool = false;
      }
    }
  }

  
  back(){
    this.event.back();
  }

}
