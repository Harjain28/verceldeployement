import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NavigationEnd, Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ApiService } from "src/app/services/api.service";
import { AuthService } from "src/app/services/auth.service";
import { EventService } from "src/app/services/event.service";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  pvisibility: boolean;
  destroyer: Subject<boolean> = new Subject();
  currentURL: string;
  IsSubmitBool: boolean = false;
  
  constructor(
    public auth: AuthService,
    private storage: StorageService,
    private event: EventService,
    private api: ApiService,
    private router: Router
  ) {
    this.pvisibility = false;
  }

  ngOnInit(): void {
    this.formInit();

     
  }

  formInit() {
    this.loginform = new FormGroup({
      email: new FormControl("", {
        validators: [
          Validators.required,
          // Validators.pattern(
          //   "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-z]{2,4}$"
          // ),
          Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
        ],
        updateOn: "blur",
      }),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  
  submitForm() {
    this.IsSubmitBool = true;
    const formValue = this.loginform.value;
    let requestData = {};
    if (formValue.email.includes('@')) {
      requestData["email"] = formValue.email.trim();
    } else {
      requestData["uniqueId"] = formValue.email.trim();

    }
    requestData["password"] = formValue.password;

    if (this.loginform.valid) {
      this.api.post("login", requestData).subscribe((res: any) => {
        // console.log(res , 'checking staus');
        if (res.status) {
            if (res.data.isverified) {
              this.storage.isVerifed = true;
            }
            this.IsSubmitBool = false;
          if (res.data.admintype == "admin") {
            this.api.alert("You have successfully logged in", "success");
            // localStorage.clear();
            localStorage.setItem('__admintype', "admin")
            // this.storage.setToken(res.token);
            this.storage.businessToken = res.token;
            this.storage.classData = res.classData;
            this.storage.setData(res.data, res.classData);
            this.storage.setbranchStatus('editbranch');
            if (res.data?.type === "business" && res.data.isverified) {
              this.router.navigate(["/pages/business-details"]);
              this.storage.setToken(res.token);
            } else if (res.data?.type  == "student" && res.data.isverified) {
              this.router.navigate([""]);
              this.storage.setToken(res.token);
            } else {
              if (res.data?.email !== '' || res.data?.mobileNo !== 'NaN') {
                this.storage.businessToken = res.token;
                this.router.navigate(["/email-verify"]);
              }else{
                this.event.businessName = res.data.businessName;
                this.event.businessPersonName = res.data.name;
                this.router.navigate(['/register/business']);
              }
            }
          } else if (res.data.admintype == "subadmin") {
            this.api.alert("You have successfully logged in", "success");
            // localStorage.clear();
            
            localStorage.setItem('__userId', res.data._id)
            localStorage.setItem('__admintype', "subadmin")
            localStorage.setItem('__adminId', res.data.admin_id)
            this.storage.setData(res.data, res.classData);
            this.storage.setbranchStatus('editbranch');
            if ((res.data?.type === "business" || res.data?.type === "subbusiness") && res.data.isverified) {
              this.storage.setToken(res.token);
              this.router.navigate(["/pages/business-details"]);
            } else if (res.data?.type  == "student" && res.data.isverified) {
              this.storage.setToken(res.token);
              this.router.navigate([""]);
            } else {
              this.router.navigate(["/email-verify"]);
            }
          } else if (res.data?.type === 'student'){
            this.storage.setToken(res.token);
            this.storage.setData(res.data, res.classData);
            this.router.navigate([""]);
          }
            setTimeout(()=> {
                  this.event.sendEditEvent();
            }, 100);
        } else {
          this.IsSubmitBool = false;
          if(res.message === 'Ask admin to verify your account'){
            sessionStorage.setItem("showClaim", 'true');
            this.router.navigate(["/claim"]);
          }else{
            this.api.alert(res.message, "error");
          }
        }
      });
    } else {
      this.IsSubmitBool = false;
      this.loginform.markAllAsTouched();
    }
  }
  ClearLocalStorage() {
     localStorage.clear();
  }
}
