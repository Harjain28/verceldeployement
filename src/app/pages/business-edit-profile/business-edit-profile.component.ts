import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
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
  // userName: any;
  uniqueId: any;
  showEdit: boolean = true;
  showEditPhone: boolean = true;
  showEmailOTPforVarification: boolean = false;
  showMobileOTPforVarification: boolean = false;
  showEmailfield: boolean = true;
  showMobilefield: boolean = true;
  adminType: string;
  diabledFeilds: boolean;
  today: any;
  businessemail: any;
  businessmobile: any;
  DisableSubmitbutton: boolean = false;
  isMobileVerified: boolean = false;

  constructor(
    private api: ApiService,
    private http: HttpClient,
    private storage: StorageService,
    private router: Router,
    private event: EventService,
    private compressImage: ImageCompressService
  ) {
    this.formInit();
    this.API_URL = environment.BASE_API_ENDPOINT;
    this.adminType = localStorage.getItem('__admintype')
    if (this.adminType == "admin") {
      this.diabledFeilds = false;
    } else if (this.adminType == "subadmin") {
      this.diabledFeilds = true;
    } else {
      this.diabledFeilds = false;
    }
  }

  openToggle() {
    this.addchild = !this.addchild;
  }

  ngOnInit(): void {
    // this.data = localStorage.getItem("userdata");
    this.api.getBusineesdetails().subscribe((res: any) => {
      this.fulldata = res?.results?.[0]?.businessDetails;
      this.businessemail = this.fulldata?.email;
      this.name = this.fulldata?.name;
      if (this.fulldata?.image !== 'blankimage' || this.fulldata?.image) {
        this.images = this.fulldata?.image;
      } else {
        this.images = 'blankimage';
      }
      // this.userName = this.fulldata.userName;
      this.uniqueId = this.fulldata?.uniqueId;
      this.gender = this.fulldata.gender;
      this.DOB = this.fulldata.DOB;
      if (this.fulldata.mobileNo.toString().length > 8) {
        this.mobileNo = this.fulldata.mobileNo.toString().slice(2);
      } else {
        this.mobileNo = this.fulldata.mobileNo.toString()
      }
      this.type = this.fulldata.type;
      this.formInit();
    });
    // this.mobileNo = this.fulldata.mobileNo.toString().slice(2);
  }

  onFileChange(event: any) {
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

  deleteProfile() {
    this.images = 'blankimage';
    this.myFiles = '';
    (<HTMLInputElement>document.getElementById(`upLoader`)).value = '';
  }

  formInit() {
    this.editProfileForm = new FormGroup({
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$"
          ),
        ],
        updateOn: "blur",
      }),
      emailOTP: new FormControl('', {
        validators: [
          Validators.required, Validators.pattern("^([0-9]{4})$")
        ],
      }),
      mobileOTP: new FormControl('', {
        validators: [
          Validators.required, Validators.pattern("^([0-9]{4})$"),
        ],
      }),

      name: new FormControl(this.name, [Validators.required]),
      // userName: new FormControl(this.userName, [Validators.required]),
      phone: new FormControl(this.mobileNo, [
        Validators.required,
        Validators.pattern("[8-9]\\d{7}"),
        // Validators.pattern("^([0-9]{0}|[0-9]{8})$"),
      ]),
      gender: new FormControl(this.gender ? this.gender : ""),
      date: new FormControl(this.DOB ? this.DOB : ""),
      image: new FormControl(""),
    });
  }

  editEmail() {
    this.showEdit = false;
    this.showEmailfield = false;
    this.showEmailOTPforVarification = false;
  }

  editPhoneNumber() {
    this.showMobilefield = false;
    this.showEditPhone = false;
    this.showMobileOTPforVarification = false;
    // this.showEdit = false;
    // this.showEmailfield = false;
  }

  submitEmail() {
    const formValue = this.editProfileForm.value;
    let requestData = {};
    requestData["email"] = formValue.email;
    this.api.post("emailOtpeditprofile", requestData).subscribe((res: any) => {
      if (res.status == true) {
        this.api.alert(res.message, 'success')
        this.showEmailfield = true;
        this.showEdit = true;
        this.showEmailOTPforVarification = true;
      } else {
        this.api.alert(res.message, 'error')
        this.showEmailOTPforVarification = false;
        this.DisableSubmitbutton = false;
      }
    });
  }

  onEmailChange(email: any) {
    if (email === this.fulldata?.email) {
      this.DisableSubmitbutton = false;
    } else {
      this.DisableSubmitbutton = true;
    }
  }

  onMobileChange(mobileno: any) {
    let mobileNo = "65" + mobileno;
    if (mobileNo === this.fulldata?.mobileNo) {
      this.DisableSubmitbutton = false;
    } else {
      this.DisableSubmitbutton = true;
    }
  }

  verifyEditEmailOtp() {
    const formValue = this.editProfileForm.value;
    let requestData = {};
    requestData["emailOTP"] = formValue.emailOTP;
    requestData["email"] = formValue.email;
    this.api.post("verifyOTPeditprofile", requestData).subscribe((res: any) => {
      if (res.status == true) {
        this.DisableSubmitbutton = false;
        this.showEmailOTPforVarification = false;
        this.api.alert(res.message, 'success')
      } else {
        this.api.alert(res.message, 'error')
        this.DisableSubmitbutton = false;
      }
    });
  }

  submitPhoneNumber() {
    const formValue = this.editProfileForm.value;
    let requestData = {};
    requestData["mobileNo"] = parseInt("+65" + formValue.phone);
    if (this.editProfileForm.controls.phone.valid) {
      this.api.post("mobileNoOtpeditprofile", requestData).subscribe((res: any) => {
        if (res.status == true) {
          this.DisableSubmitbutton = false;
          this.api.alert(res.message, 'success')
          this.showMobilefield = true;
          this.showEditPhone = true;
          this.showMobileOTPforVarification = true;
        } else {
          this.api.alert(res.message, 'error')
          this.showMobileOTPforVarification = false;
          this.DisableSubmitbutton = false;
        }
      });
    }
  }

  verifyEditPhoneOtp() {
    const formValue = this.editProfileForm.value;
    let requestData = {};
    requestData["mobileOTP"] = formValue.mobileOTP;
    requestData["mobileNo"] = parseInt("+65" + formValue.phone);
    if (this.editProfileForm.controls.mobileOTP.valid) {
      this.api.post("verifyOTPeditprofile", requestData).subscribe((res: any) => {
        if (res.status == true) {
          this.showMobileOTPforVarification = false;
          this.api.alert(res.message, 'success')
          this.isMobileVerified = true;
        } else {
          this.api.alert(res.message, 'error')
          this.showMobileOTPforVarification = false;
          this.DisableSubmitbutton = false;
        }
      });
    }

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

  currentDate() {
    this.today = new Date();
    let dd = String(this.today.getDate()).padStart(2, '0');
    let mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = this.today.getFullYear();
    this.today = yyyy + '-' + mm + '-' + dd;
    return this.today;
  }

  submitEditProfileForm() {
    if (this.showEmailOTPforVarification || this.showMobileOTPforVarification) {
      this.editProfileForm.get('mobileOTP').setValidators([Validators.required, Validators.pattern("^([0-9]{4})$"),]);
      this.editProfileForm.get('mobileOTP').updateValueAndValidity();
      this.editProfileForm.get('emailOTP').setValidators([Validators.required, Validators.pattern("^([0-9]{4})$"),]);
      this.editProfileForm.get('emailOTP').updateValueAndValidity();
    } else {
      this.editProfileForm.get('emailOTP').clearValidators();
      this.editProfileForm.get('emailOTP').updateValueAndValidity();
      this.editProfileForm.get('mobileOTP').clearValidators();
      this.editProfileForm.get('mobileOTP').updateValueAndValidity();
    }

    const formValue = this.editProfileForm.value;
    this.mobile = parseInt("+65" + formValue.phone);
    const formData: FormData = new FormData();
    if (this.images === '' || this.images === 'blankimage') {
      formData.append("image", 'blankimage');
    } else {
      formData.append("image", this.myFiles ? this.myFiles : this.images);
    }

    // formData.append("userName", formValue.userName);
    formData.append("name", formValue.name);
    formData.append("email", formValue.email);
    if (this.isMobileVerified) {
      formData.append("mobileNo", this.mobile.toString());
    } else {
      formData.append("mobileNo", '65' + this.mobileNo.toString());
    }
    formData.append("gender", formValue.gender);
    formData.append("DOB", formValue.date);
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("LoggedIn"),
    });
    if (this.editProfileForm.valid) {
      this.http.post(`${this.API_URL}editprofile`, formData, { headers: headers }).subscribe((res: any) => {
        if (res.status == true) {
          this.event.businessDetails = false;
          this.api.alert(res.message, "success");
          localStorage.setItem("userdata", JSON.stringify(res.data));
          this.router.navigate(["/pages/business-profile"]);
          setTimeout(() => {
            this.event.sendEditEvent();
          }, 100);
        } else {
          this.api.alert(res.message, "error");
          this.DisableSubmitbutton = false;
        }
      });
    } else {
      this.editProfileForm.markAllAsTouched();
      this.DisableSubmitbutton = false;
    }
  }

  back() {
    this.event.back();
  }
}
