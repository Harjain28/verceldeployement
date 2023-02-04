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
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent implements OnInit {
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
  DOB: any;
  images: any;
  myFiles: any;
  mobile: any;
  userName: any;
  showEdit: boolean = true;
  showEditPhone: boolean = true;
  showEmailOTPforVarification: boolean = false;
  showMobileOTPforVarification: boolean = false;
  showEmailfield: boolean = true;
  showMobilefield: boolean = true;
  today: any;
  isupdate: boolean = true;
  errorPhone: boolean = true;
  countryCode: any;
  phoneDetail: any;
  iso2: any;
  DisableSubmitbutton: boolean = false;

  constructor(
    private api: ApiService,
    private storage: StorageService,
    private router: Router,
    private http: HttpClient,
    public event: EventService,
    private compressImage: ImageCompressService
  ) {
    this.API_URL = environment.BASE_API_ENDPOINT;

    this.getUserData();
  }
  // openToggle() {
  //   this.addchild = !this.addchild;
  // }
  ngOnInit(): void {
    this.formInit();
  }

  getUserData() {
    this.data = JSON.parse(localStorage.getItem("userdata"));
    this.countryCode = this.data?.countryCode;
    let UserId = this.data?._id;
    this.api.get('getuserbyId?userId=' + UserId).subscribe((res: any) => {
      this.fulldata = res.userData;
      this.email = this.fulldata?.email;
      if (this.fulldata?.image !== 'blankimage' || this.fulldata?.image) {
        this.images = this.fulldata?.image;
      } else {
        this.images = 'blankimage';
      }
      this.gender = this.fulldata?.gender;
      this.DOB = this.fulldata?.DOB;
      this.name = this.fulldata?.name;
      this.userName = this.fulldata?.userName;
      if (this.fulldata?.mobileNo) {
        this.mobileNo = this.fulldata?.mobileNo.toString().slice(2);
      }
      this.type = this.fulldata?.type;
      this.formInit();
    });
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
      })
  }

  deleteProfile() {
    this.images = 'blankimage';
    this.myFiles = '';
    (<HTMLInputElement>document.getElementById(`upLoader`)).value = '';
  }


  formInit() {
    this.editProfileForm = new FormGroup({
      email: new FormControl(this.email, {
        validators: [Validators.required,
        Validators.pattern(
          "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$"
        ),
        ],
        updateOn: "blur",
      }),
      name: new FormControl(this.name, [Validators.required]),
      userName: new FormControl(this.userName, [Validators.required]),
      phone: new FormControl(this.mobileNo),
      emailOTP: new FormControl({
        validators: [
          , Validators.pattern("^([0-9]{4})$")
        ],
      }),
      mobileOTP: new FormControl('', {
        validators: [
          , Validators.pattern("^([0-9]{4})$"),
        ],
      }),

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

  // editPhoneNumber() {
  //   this.showMobilefield = false;
  //   this.showEditPhone = false;
  //   this.showMobileOTPforVarification = false;
  //   // this.showEdit = false;
  //   // this.showEmailfield = false;
  // }

  submitEmail() {
    const formValue = this.editProfileForm.value;
    let requestData = {};
    requestData["email"] = formValue.email;
    this.api.post("emailOtpeditprofile", requestData).subscribe((res: any) => {
      if (res.status == true) {
        this.api.alert('OTP sucessfully send to your registered email', 'success')
        this.showEmailfield = true;
        this.showEdit = true;
        this.showEmailOTPforVarification = true;
      } else {
        this.api.alert(res.message, 'error')
        this.showEmailOTPforVarification = false;
      }
    });
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
      }
    });
  }

  submitPhoneNumber() {
    if (this.errorPhone) {
      const formValue = this.editProfileForm.value;
      let requestData = {};
      requestData["mobileNo"] = parseInt("+91" + formValue.phone);
      this.api.post("mobileNoOtpeditprofile", requestData).subscribe((res: any) => {
        if (res.status == true) {
          this.api.alert('OTP sucessfully send to your registered mobile number', 'success')
          this.showMobilefield = true;
          this.showEditPhone = true;
          this.showMobileOTPforVarification = true;
        } else {
          this.api.alert(res.message, 'error')
          this.showMobileOTPforVarification = false;
        }
      });
    } else {
      // this.api.alert('Please enter valid number', 'error');
    }
  }

  verifyEditPhoneOtp() {
    const formValue = this.editProfileForm.value;
    let requestData = {};
    requestData["mobileOTP"] = formValue.mobileOTP;
    requestData["mobileNo"] = parseInt("+91" + formValue.phone);
    this.api.post("verifyOTPeditprofile", requestData).subscribe((res: any) => {
      if (res.status == true) {

        this.showMobileOTPforVarification = false;
        this.api.alert(res.message, 'success')
      } else {
        this.api.alert(res.message, 'error')
        this.showMobileOTPforVarification = false;
      }
    });
  }


  onEmailChange(email: any) {
    if (email === this.fulldata?.email) {
      this.DisableSubmitbutton = false;
      this.isupdate = true;
    } else {
      this.isupdate = false;
      this.DisableSubmitbutton = true;
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

  onCountryChange(event) {
    this.phoneDetail = event?.dialCode;
    this.iso2 = event?.iso2;
  }

  phoneDetails(phoneDetails: any) {
    throw new Error("Method not implemented.");
  }

  telInputObject(obj) {
    if (this.countryCode) {
      obj.setCountry(this.countryCode);
    }

  }
  hasError(event) {
    let phoneVal = this.editProfileForm.controls.phone.value;
    if (phoneVal?.trim().length > 0) {
      this.errorPhone = event;
    }else{
      this.errorPhone = true;
    }
  }

  getNumber(event) {
  }

  submitEditProfileForm() {
    // if (this.showEmailOTPforVarification || this.showMobileOTPforVarification) {
    //   this.editProfileForm.get('mobileOTP').setValidators([Validators.required, Validators.pattern("^([0-9]{4})$"),]);
    //   this.editProfileForm.get('mobileOTP').updateValueAndValidity();
    //   this.editProfileForm.get('emailOTP').setValidators([Validators.required, Validators.pattern("^([0-9]{4})$"),]);
    //   this.editProfileForm.get('emailOTP').updateValueAndValidity();
    // } else {
    //   this.editProfileForm.get('emailOTP').clearValidators();
    //   this.editProfileForm.get('emailOTP').updateValueAndValidity();
    //   this.editProfileForm.get('mobileOTP').clearValidators();
    //   this.editProfileForm.get('mobileOTP').updateValueAndValidity();
    // }
    const formValue = this.editProfileForm.value;
    const formData: FormData = new FormData();
    if (this.images === '' || this.images === 'blankimage') {
      formData.append("image", 'blankimage');
    } else {
      formData.append("image", this.myFiles ? this.myFiles : this.images);
    }
    formData.append("userName", formValue.userName);
    formData.append("name", formValue.name);
    formData.append("email", formValue.email);
    if (this.iso2) {
      formData.append('countryCode', this.iso2);
    } else {
      formData.append('countryCode', this.countryCode);
    }

    if (formValue?.phone?.length > 0 && formValue?.phone?.trim() !== '') {
      if (this.phoneDetail) {
        this.mobile = (formValue.phone?.length > 0) ? parseInt(formValue.phone) : '';
        formData.append("mobileNo", this.phoneDetail + this.mobile.toString());
      } else {
        this.mobile = (formValue?.phone?.length > 0) ? parseInt(formValue.phone) : '';
        formData.append("mobileNo", '+65' + this.mobile.toString());
      }
    } else {
      formData.append("mobileNo", '');
    }
    formData.append("gender", formValue.gender);
    formData.append("DOB", formValue.date);

    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("LoggedIn"),
    });
    if (this.editProfileForm.valid) {
      if (this.errorPhone) {
        this.isupdate = false;
        this.http.post(`${this.API_URL}editprofile`, formData, { headers: headers }).subscribe((res: any) => {
          if (res.status == true) {
            this.api.alert("Klassbook Profile Updated Sucessfully", "success");
            localStorage.setItem("userdata", JSON.stringify(res.data));
            // window.location.reload();
            this.router.navigate(["/profile/profile"]);
            setTimeout(() => {
              this.event.sendEditEvent();
            }, 200);
          } else {
            this.api.alert(res.message, "error");
            this.isupdate = true;
          }
        });
      } else {
        // this.api.alert('Please enter valid number', 'error');
      }
    } else {
      this.editProfileForm.markAllAsTouched();
    }
    // location.reload();
  }
  back() {
    this.event.back();
  }
}
