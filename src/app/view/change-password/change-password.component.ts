import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  ChangePasswordForm: FormGroup;
  pvisibility: boolean;
  pcvisibility: boolean;
  cpvisibility: boolean;
  userData: any;
  type: any;
  changePasswordId: any;
  formIsValid: boolean = false;


  constructor(private storage: StorageService,
    private router: Router,
    private route: ActivatedRoute,

    private event: EventService,
    private api: ApiService) {
    this.pvisibility = false;
    this.pcvisibility = false;
    this.cpvisibility = false

    this.route.params.subscribe((params) => {
      this.changePasswordId = params["id"];
    });
  }

  ngOnInit(): void {
    this.formInit();
    this.userData = JSON.parse(localStorage.getItem("userdata"));
    this.type = this.userData.type
  }

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }


  formInit() {
    this.ChangePasswordForm = new FormGroup({
      oldpassword: new FormControl("", [Validators.minLength(6)]),
      password: new FormControl("", [
        Validators.required,
        ChangePasswordComponent.patternValidator(/\d/, { hasNumber: true }),
        ChangePasswordComponent.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        ChangePasswordComponent.patternValidator(/[a-z]/, { hasSmallCase: true }),
        ChangePasswordComponent.patternValidator(/[!@#$%^&*{}()_"|,.<>?]/, { hasSpecialCharacters: true }),
        Validators.minLength(8),
      ]),
      confirm_password: new FormControl("", [Validators.required]),
    });
    this.formIsValid = this.ChangePasswordForm.controls.password.valid ? true : false;
    // console.log(this.formIsValid,'object')
    // if(this.ChangePasswordForm.controls.password.valid) this.formIsValid = true;
  }
  
  validation(){
    this.formIsValid = this.ChangePasswordForm.controls.password.valid ? true : false;
  }

  matchinputValue(parentControl: FormControl, childControl: FormControl) {
    if (parentControl.value !== childControl.value) {
      childControl.setErrors({ noMatch: true });
    } else {
      childControl.clearValidators();
      childControl.updateValueAndValidity();
    }
  }

  submitResetPasswordForm() {
    if (this.changePasswordId) {
      const formValue = this.ChangePasswordForm.value;
      let requestData = {};
      requestData["new_password"] = formValue.password;
      requestData["confirm_password"] = formValue.confirm_password;
      if (this.ChangePasswordForm.valid) {
        this.api.post(`reset_password/${this.changePasswordId}`, requestData).subscribe((res: any) => {
          //console.log(res, "changepassword")
          if (res.status === true) {
             localStorage.clear();
            if (this.type == "business") {
              this.api.alert(
                "Password Changed Successfully",
                "success"
              );
              this.router.navigate(["/login/business"]);
              // this.router.navigate(["/pages/business-profile"]);
            } else {
              this.api.alert(
                "Password Changed Successfully",
                "success"
              );
              this.router.navigate(["/login/student"]);
            }
          } else {
            this.api.alert('Incorrect Old Password', "error");
          }
        });
      } else {
        this.ChangePasswordForm.markAllAsTouched();
      }
    } else {
      const formValue = this.ChangePasswordForm.value;
      let requestData = {};
      requestData["old_password"] = formValue.oldpassword;
      requestData["new_password"] = formValue.password;
      if (this.ChangePasswordForm.valid) {
        this.api.post(`changepassword`, requestData).subscribe((res: any) => {
          if (res.status === true) {
            if (this.type == "business") {
              this.api.alert(
                "Password Changed Successfully",
                "success"
              );
              this.router.navigate(["/pages/business-profile"]);
            } else {
              this.api.alert(
                "Password Changed Successfully",
                "success"
              );
              this.router.navigate(["/"]);
            }
          } else {
            this.api.alert('Incorrect Old Password', "error");
          }
        });
      } else {
        this.ChangePasswordForm.markAllAsTouched();
      }
    }

  }

  back() {
    this.event.back();
  }
}
