import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Config } from "ng-otp-input/lib/models/config";
import { Subscription, timer } from "rxjs";
import { take } from "rxjs/operators";
import { ApiService } from "src/app/services/api.service";
import { EventService } from "src/app/services/event.service";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.scss"],
})
export class VerifyEmailComponent implements OnInit {
  phone: any;
  email: any;
  verifyform: FormGroup = new FormGroup({});
  emailOtp: any;
  phoneOtp: any;
  rightmobileOTP: boolean = false;
  wrongmobileOTP: boolean = false;
  rightemailOTP: boolean = false;
  wrongemaileOTP: boolean = false;
  data: any;
  eOTP: string;
  mOTP: string;
  fulldata: any;
  changeOtpBool: boolean = false;
  IsSubmitBool: boolean = false;
  redirectToClaimPage: boolean = false;
  countDown: Subscription;
  counter = 60;
  tick = 1000;
  bNameLength: number;
  isMailVerified: any;
  showResendMailOtp: boolean = false;
  showResendMobOtp: boolean = false;
  showMailOtpTimer: boolean = true;
  showMobOtpTimer: boolean = true;

  @ViewChild("ngmobileOtpInput", { static: false }) ngmobileOtpInput: any;
  @ViewChild("ngemailOtpInput", { static: false }) ngemailOtpInput: any;

  config: Config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: "",
    inputStyles: {
      width: "45px",
      height: "45px",
      "font-size": "20px",
    },
  };
  userId: any;
  isForgetPass: string;



  constructor(
    private storage: StorageService,
    private event: EventService,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isMailVerified = localStorage.getItem("email_verified");
    this.data = localStorage.getItem("userdata");
    this.isForgetPass = localStorage.getItem("forgetPass");
    this.fulldata = JSON.parse(this.data);
    this.userId = this.fulldata?._id
    this.email = this.fulldata?.email;
    this.phone = this.fulldata?.mobileNo;
    this.eOTP = this.fulldata?.emailOTP;
    this.mOTP = this.fulldata?.mobileOTP;
    if (this.isMailVerified) {
      this.router.navigate(["/"]);
    }

    this.countDown = timer(0, this.tick)
      .pipe(take(this.counter))
      .subscribe(() => {
        --this.counter;
        if (this.counter == 0) {
          this.countDown.unsubscribe();
          this.showResendMailOtp = true;
          this.showResendMobOtp = true;
          this.showMailOtpTimer = false;
          this.showMobOtpTimer = false;
        }
      });
  }

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }

  onemailOtpChange(otp: any) {
    this.emailOtp = otp;
    if (this.emailOtp == this.eOTP) {
      this.rightemailOTP = true;
      this.wrongemaileOTP = false;
      if (this.counter == 0) {
        this.showResendMailOtp = false;
      }
    } else {
      this.rightemailOTP = false;
      this.wrongemaileOTP = true;
      if (this.counter == 0) {
        this.showResendMailOtp = true;
      }
    }
  }

  onOtpChange(otp: any) {
    this.phoneOtp = otp;
    if (this.phoneOtp == this.mOTP) {
      this.rightmobileOTP = true;
      this.wrongmobileOTP = false;
      if (this.counter == 0) {
        this.showResendMobOtp = false;
      }
    } else {
      this.rightmobileOTP = false;
      this.wrongmobileOTP = true;
      if (this.counter == 0) {
        this.showResendMobOtp = true;
      }
    }
  }

  formInit() {
    this.verifyform = new FormGroup({
      mobileotp: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
      emailotp: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  verifyOtpmobile() {
    this.IsSubmitBool = true;
    const formValue = this.verifyform.value;
    const requestData = {};
    requestData["mobileOTP"] = this.phoneOtp;
    requestData["emailOTP"] = this.emailOtp;
    if (this.phoneOtp && this.emailOtp) {
      this.api.post(`verifyOTP/${this.fulldata?._id}`, requestData).subscribe((res: any) => {
        if (res.status == true) {
          localStorage.setItem("email_verified", res.userData.email_verified);
          this.IsSubmitBool = false;
          if (res.userData.businessClaim) {
            sessionStorage.setItem("showClaim", 'true');
            this.router.navigate(["/claim"]);
          } else {
            if (this.isForgetPass === 'yes') {
              this.router.navigate(["/view/change-password/" + this.userId]);
            } else {
              localStorage.setItem("LoggedIn", this.storage.businessToken);
              setTimeout(() => {
                this.api.alert("You are successfully verified", "success");
                this.router.navigate(["/pages/business-profle-mobile"]);
              }, 100);
            }
          }
        } else {
          this.IsSubmitBool = false;
          this.api.alert(res.message, "error");
          this.router.navigate(["/email-verify"]);
        }
      });
    } else {
      this.verifyform.markAllAsTouched();
      this.IsSubmitBool = false;
      this.router.navigate(["/email-verify"]);
    }
  }

  verifyOtp() {
    this.IsSubmitBool = true;
    const requestData = {};
    requestData["mobileOTP"] = this.phoneOtp;
    requestData["emailOTP"] = this.emailOtp;
    requestData["is_forgetpassword"] = (this.isForgetPass === 'yes') ? true : false;
    
    if (this.phoneOtp && this.emailOtp) {
      this.api.post(`verifyOTP/${this.userId}`, requestData).subscribe((res: any) => {
        if (res.status == true) {
          localStorage.setItem("email_verified", res.userData.email_verified);
          this.event.businessName = '';
          this.event.businessPersonName = '';
          this.IsSubmitBool = false;
          if (res.userData.businessClaim) {
            sessionStorage.setItem("showClaim", 'true');
            this.router.navigate(["/claim"]);
          } else {
            if (this.isForgetPass === 'yes') {
              this.router.navigate(["/view/change-password/" + this.userId]);
            } else {
              localStorage.setItem("LoggedIn", this.storage.businessToken);
              this.api.alert("You are successfully verified", "success");
              this.router.navigate(["/pages/business-profile"]);
            }
          }
        } else {
          this.IsSubmitBool = false;
          this.api.alert(res.message, "error");
          this.router.navigate(["/email-verify"]);
        }
      });
    } else {
      this.verifyform.markAllAsTouched();
      this.IsSubmitBool = false;
      this.router.navigate(["/email-verify"]);
    }
  }

  resendEmailOTP() {
    this.timeCounter(1);
    const requestData = {};
    requestData["email"] = this.email;
    this.api.post(`resendOTP/${this.userId}`, requestData).subscribe((res: any) => {
      this.eOTP = res?.data?.emailOTP;
      if (res.status == true) {
        this.changeOtpBool = true;
        this.eOTP = '';
        this.eOTP = res?.data?.emailOTP;
        this.api.alert(
          "OTP successfully send to you registered Email",
          "success"
        );
      } else {
        this.api.alert(res.message, "error");
      }
    });
  }

  resendMobileOTP() {
    this.timeCounter(2);
    const requestData = {};
    requestData["mobileNo"] = this.phone;
    this.api.post(`resendOTP/${this.userId}`, requestData).subscribe((res: any) => {
      this.mOTP = res.data?.mobileOTP;
      if (res.status == true) {
        this.mOTP = res.data?.mobileOTP;
        this.api.alert(
          "OTP successfully send to you registered mobile number",
          "success"
        );
      } else {
        this.api.alert(res.message, "error");
      }
    });
  }

  timeCounter(type: number) {
    this.counter = 120;
    if (type === 1) {
      this.showResendMailOtp = false;
      this.showMailOtpTimer = true;
    } else {
      this.showResendMobOtp = false;
      this.showMobOtpTimer = true;
    }
    this.countDown = timer(0, this.tick).pipe(take(this.counter)).subscribe(() => {
      --this.counter;
      if (this.counter == 0) {
        this.countDown.unsubscribe();
        this.showResendMobOtp = true;
        this.showMobOtpTimer = false;
        this.showResendMailOtp = true;
        this.showMailOtpTimer = false;
      }
    });
  }

}
