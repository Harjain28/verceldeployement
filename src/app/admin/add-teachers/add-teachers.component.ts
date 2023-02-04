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
  selector: "app-add-teachers",
  templateUrl: "./add-teachers.component.html",
  styleUrls: ["./add-teachers.component.scss"],
})
export class AddTeachersComponent implements OnInit {
  @ViewChild('firstName') firstNameRef: ElementRef;
  newteacher: boolean;
  localValue: string = localStorage.getItem("businessId");
  images: any = '';
  url: any;

  myForm = new FormGroup({
    teachername: new FormControl("", [Validators.required]),
    description: new FormControl(""),
    image: new FormControl(""),
    Selected: new FormControl([], Validators.required)

    // fileSource: new FormControl("", [Validators.required]),
  });

  API_URL: string;
  @ViewChild(SelectAutocompleteComponent)
  multiSelect: SelectAutocompleteComponent;
  options = [];
  selectedOptions = [];
  classId: any;
  selected = this.selectedOptions;
  showError = false;
  errorMessage = "";
  selectedMessage: any;
  allbranchData: any = [];
  albumImage: any;
  data: string;
  fulldata: any;
  adminId: any;
  myFiles: any;
  classdetails: any;
  class: any;
  id: any;
  teacherData: any;
  image: any='';
  description: any;
  teacherName: any;
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
      let requestData = {};
      requestData["type"] = "teacher"
      requestData["id"] = this.id
      const headers = new HttpHeaders({
        Authorization: localStorage.getItem("admintoken"),
      });
      this.http.post(`${this.API_URL}admingetdatabyid`, requestData,{ headers: headers}).subscribe((res: any) => {
        this.teacherData = res?.data;
        this.images = this.teacherData?.image;
        this.description = this.teacherData?.description == "undefined" ?'':this.teacherData?.description;
        this.teacherName = this.teacherData?.teacherName;
        this.selectedOptions = this.teacherData?.userId?.map((item: any) => { return item }).slice(1)
      });
    });
  }

  openToggle() {
    this.newteacher = !this.newteacher;
  }

  ngOnInit(): void {
    this.data = localStorage.getItem("userData");
    this.fulldata = JSON.parse(this.data);
    this.adminId = this.fulldata?._id;
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

  onFileChange(event) {
    let image: File = event.target.files[0]
    this.compressImage.compress(image)
      .pipe(take(1))
      .subscribe(compressedImage => {
        for (var i = 0; i < event.target.files.length; i++) {
          this.myFiles = compressedImage;
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.images = event.target.result;
            this.firstNameRef.nativeElement.focus();
          };
          reader.readAsDataURL(compressedImage);
        }
      });
  }

  deleteImage(): void {
    this.images = '';
    this.myFiles = this.images;
    (<HTMLInputElement>document.getElementById('deleteimg')).value = ''
  }

  getBranchdetails() {
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("admintoken"),
    });
    this.http.get(`${this.API_URL}admingetBranchlisting?userId=${this.userId}`,{ headers: headers}).subscribe((res: any) => {
      this.allbranchData = res?.branchDetails;
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
      this.classdetails = res.results[1].classDetails;
      this.classdetails.forEach(element => {
        this.class = element?.businessName;
        this.classId = element?._id;
      });
    });
  }

  submit() {
    const formvalue = this.myForm.value;
    const formData: FormData = new FormData();
    formData.append("classId", this.classId);
    formData.append("adminId", this.selected ? [this.adminId, ...formvalue?.Selected].join(",") : [this.adminId, ...this.selected].join(","));
    formData.append("description", formvalue?.description);
    formData.append("teacherName", formvalue?.teachername);
    formData.append("image", this.myFiles?this.myFiles:this.images);
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("admintoken"),
    });
    if (this.id) {
      formData.append("teacherId", this.id);
      if (this.myForm.valid) {
        this.http
          .post(`${this.API_URL}admineditTeacher`, formData, { headers: headers })
          .subscribe((res: any) => {
            if (res.status == true) {
              this.router.navigate([`admin/teachers/${this.userId}/${this.token}/${this.adminId}`]);
            } else {
              this.api.alert(res.message, "error");
            }
          });
      } else {
        this.myForm.markAllAsTouched();
      }
    } else {
      if (this.myForm.valid) {
       
        this.http
          .post(`${this.API_URL}adminaddTeacher`, formData, { headers: headers })
          .subscribe((res: any) => {
            if (res.status == true) {
              this.router.navigate([`admin/teachers/${this.userId}/${this.token}/${this.adminId}`]);
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
