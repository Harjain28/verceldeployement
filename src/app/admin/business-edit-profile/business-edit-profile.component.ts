import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { take } from "rxjs/operators";
import { ApiService } from "src/app/services/api.service";
import { EventService } from "src/app/services/event.service";
import { ImageCompressService } from "src/app/services/image-compress.service";
import { StorageService } from "src/app/services/storage.service";
import { environment } from "src/environments/environment";
@Component({
  selector: 'app-business-edit-profile',
  templateUrl: './business-edit-profile.component.html',
  styleUrls: ['./business-edit-profile.component.scss']
})
export class BusinessEditProfileComponent implements OnInit {
  @ViewChild('firstName') firstNameRef: ElementRef;
  API_URL: string;
  editProfileForm: FormGroup;
  addchild: any;
  data: any;
  fulldata: any;
  email: any;
  name: any;
  mobileNo: String;
  type: any;
  gender: any;
  myFiles: any;
  images: any;
  DOB: any;
  mobile: number;
  userName: any;
  userId: any;
  token: any;
  newtoken: string;
  uniqueId: any;
  showEdit: boolean = true;
  showEditPhone: boolean = true;
  showEmailOTPforVarification: boolean = false;
  showMobileOTPforVarification: boolean = false;
  showEmailfield: boolean = true;
  showMobilefield: boolean = true;
  adminType: string;
  diabledFeilds: boolean;

  constructor(
    private api: ApiService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private storage: StorageService,
    private router: Router,
    private event: EventService,
    private compressImage: ImageCompressService) {
    this.API_URL = environment.BASE_API_ENDPOINT;
    this.adminType = localStorage.getItem('__admintype')
    if (this.adminType == "superAdmin") {
      this.diabledFeilds = false;
    } else {
      this.diabledFeilds = true;
    }
  }

  openToggle() {
    this.addchild = !this.addchild;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params?.userId;
      this.token = params?.token;
      localStorage.setItem("admintoken", this.token);
      localStorage.setItem("businessadminid", this.userId);
      this.newtoken = localStorage.getItem("admintoken");
    })

    this.data = localStorage.getItem("userData");
    this.fulldata = JSON.parse(this.data);
    this.email = this.fulldata?.email === 'null' ? '' : this.fulldata?.email;
    this.images = this.fulldata?.image;
    this.userName = this.fulldata?.userName;
    this.uniqueId = this.fulldata?.uniqueId;
    this.gender = this.fulldata?.gender;
    this.DOB = this.fulldata?.DOB;
    this.name = this.fulldata?.name;
    if (this.fulldata?.mobileNo?.toString().length > 8) {
      this.mobileNo = this.fulldata?.mobileNo?.toString().slice(2);
    } else {
      this.mobileNo = this.fulldata?.mobileNo?.toString() === '65' ? '' : this.fulldata?.mobileNo?.toString();
    }
    this.type = this.fulldata?.type;
    this.formInit();
  }

  onFileChange(event: any) {
    let image: File = event.target.files[0]
    // console.log(`Image size before compressed: ${image.size} bytes.`)
    this.compressImage.compress(image)
      .pipe(take(1))
      .subscribe(compressedImage => {
        // console.log(`Image size after compressed: ${compressedImage.size} bytes.`)
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

  formInit() {
    this.editProfileForm = new FormGroup({
      email: new FormControl(this.email, {
        validators: [
          Validators.pattern(
            "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$"
          ),
        ],
        updateOn: "blur",
      }),
      name: new FormControl(this.name, [Validators.required]),
      userName: new FormControl(this.userName),
      phone: new FormControl(this.mobileNo, [
        Validators.pattern("^([0-9]{0}|[0-9]{8})$"),
      ]),
      gender: new FormControl(this.gender ? this.gender : ""),
      date: new FormControl(this.DOB ? this.DOB : ""),
      image: new FormControl(""),
    });
  }



  numberOnly(event, type: string): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    const isOnlyNumber = charCode > 31 && (charCode < 48 || charCode > 57);
    const isFlotedNumber =
      charCode > 31 && (charCode < 46 || charCode > 57 || charCode === 47);
    if (type !== "price") {
      if (isOnlyNumber) {
        return false;
      }
      return true;
    } else {
      if (isFlotedNumber) {
        return false;
      }
      return true;
    }
  }

  handleresetpasswordRoute(name: any) {
    this.router.navigate([`/admin/${name}/${this.userId}/${this.token}`])
  }

  submitEditProfileForm() {
    const formValue = this.editProfileForm.value;
    this.mobile = parseInt("+65" + formValue?.phone);
    const formData: FormData = new FormData();

    formData.append("image", this.myFiles ? this.myFiles : this.images);
    // formData.append("userName", formValue.userName);
    formData.append("name", formValue.name);
    formData.append("email", formValue.email === "" ? null : formValue.email);
    formData.append("mobileNo", this.mobile.toString() === "" ? null : this.mobile.toString());
    formData.append("gender", formValue.gender);
    formData.append("DOB", formValue.date);
    formData.append("userId", this.userId);
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("admintoken"),
    });
    if (this.editProfileForm.valid) {
      this.http.post(`${this.API_URL}admineditprofile`, formData, { headers: headers }).subscribe((res: any) => {
        if (res.status == true) {
          this.api.alert(res?.message, "success");
          localStorage.setItem("userData", JSON.stringify(res?.data));
          this.router.navigate([`admin/business-profile/${this.userId}/${this.token}`]);
        } else {
          this.api.alert(res.message, "error");
        }
      });
    } else {
      this.editProfileForm.markAllAsTouched();
    }
  }

  back(){
    this.event.back();
  }

}
