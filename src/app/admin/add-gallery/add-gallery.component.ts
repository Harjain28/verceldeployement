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
  myForm = new FormGroup({
    albumname: new FormControl(""),
    file: new FormControl(""),
    Selected: new FormControl([], Validators.required)
  });

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
  userId: any;
  token: any;

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private event: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private compressImage: ImageCompressService
  ) {
    this.API_URL = environment.BASE_API_ENDPOINT;
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.userId = params?.userId;
      this.token = params?.token;
      localStorage.setItem("admintoken", this.token);
      localStorage.setItem("businessadminid", this.userId);
      if (this.id) {
        let requestData = {};
        requestData["type"] = ""
        requestData["id"] = this.id
        const headers = new HttpHeaders({
          Authorization: localStorage.getItem("admintoken"),
        });
        this.http.post(`${this.API_URL}admingetdatabyid`, requestData, { headers: headers }).subscribe((res: any) => {
          this.albumData = res?.data;
          this.albumName = this.albumData?.albumName == 'undefined' ? "" : this.albumData?.albumName;
          this.imagesDefault = this.albumData?.image.slice();
          this.selectedOptions = this.albumData?.userId.map((item: any) => { return item }).slice(1)
        });
      }
    });
  }

  ngOnInit(): void {
    this.data = localStorage.getItem("userData");
    this.fulldata = JSON.parse(this.data);
    this.adminId = this.fulldata?._id;
    this.route.params.subscribe((params) => {
      // this.adminId = params?.AdminId;
    });
    this.getBranchdetails();
    this.getbusinessDetails();
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

  deleteImage(i: any): void {
    this.index = i;
    (<HTMLInputElement>document.getElementById(`upLoader${i}`)).value = '';
    this.images.splice(i, 1);
    this.myFiles.splice(i, 1);
  }

  deleteEditImage(i: any): void {
    this.index = i;
    (<HTMLInputElement>document.getElementById(`upLoader${i}`)).value = '';
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
            this.firstNameRef.nativeElement.focus();
          };
          reader.readAsDataURL(compressedImage);
        
      })
    }

  }

  getBranchdetails() {
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("admintoken"),
    });
    this.http.get(`${this.API_URL}admingetBranchlisting?userId=${this.userId}`, { headers: headers }).subscribe((res: any) => {
      this.allbranchData = res.branchDetails;
      this.allbranchData.forEach((element) => {
        this.options.push({
          value: element?._id,
          display: element?.branchName,
        });
      });
    });
  }

  getbusinessDetails() {
    this.api.getAdminBusinessDetails().subscribe((res: any) => {
      this.classdetails = res?.results[1]?.classDetails;
      this.classdetails.forEach((element: any) => {
        this.class = element?.businessName;
        this.classId = element?._id;
      });
    });
  }

  submit() {
    const formvalue = this.myForm.value;
    const formData: FormData = new FormData();
    if (this.imagesDefault.length > 0) {
      this.myForm.get('file').clearValidators();
      this.myForm.get('file').updateValueAndValidity();
    } else if (this.myFiles.length > 0) {
      this.myForm.get('file').clearValidators();
      this.myForm.get('file').updateValueAndValidity();
    } else {
      this.myForm.get('file').setValidators([Validators.required]);
      this.myForm.get('file').updateValueAndValidity();
    }
    formData.append("classId", this.classId);
    formData.append("adminId", this.selected ? [this.adminId, ...formvalue.Selected].join(",") : [this.adminId, ...this.selected].join(","));
    formData.append("albumName", formvalue?.albumname);

    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("admintoken"),
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
          .post(`${this.API_URL}admineditgallery`, formData, { headers: headers })
          .subscribe((res: any) => {
            if (res.status == true) {
              this.router.navigate([`admin/gallery/${this.userId}/${this.token}/${this.adminId}`]);
            } else {
              this.api.alert(res.message, "error");
            }
          });
      } else {
        this.myForm.markAllAsTouched();
      }
    } else {
      for (var i = 0; i < this.myFiles.length; i++) {
        formData.append("image", this.myFiles[i]);
      }
      if (this.myForm.valid) {
        this.http
          .post(`${this.API_URL}adminaddgallery`, formData, { headers: headers })
          .subscribe((res: any) => {
            if (res.status == true) {
              this.router.navigate([`admin/gallery/${this.userId}/${this.token}/${this.adminId}`]);
            } else {
              this.api.alert(res.message, "error");
            }
          });
      } else {
        this.myForm.markAllAsTouched();
      }
    }
  }

  back(){
    this.event.back();
  }
}
