import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  ResetPasswordForm: FormGroup = new FormGroup({});
  pvisibility: boolean;
  pcvisibility: boolean;
  cpvisibility: boolean;
  userData: any;
  type: any;
  userId: any;
  token: any;
  newtoken: string;
  API_URL: any;
  constructor(private storage: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private event: EventService,
    private http: HttpClient,
    private api: ApiService) {
      this.API_URL = environment.BASE_API_ENDPOINT;
    this.pvisibility = false;
    this.pcvisibility = false;
    this.cpvisibility = false;
    this.formInit();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params?.userId;
      this.token = params?.token;
      localStorage.setItem("admintoken", this.token);
      localStorage.setItem("businessadminid", this.userId);
      this.newtoken = localStorage.getItem("admintoken");
    })
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.type = this.userData.type
    this.formInit();
  }

  formInit() {
    this.ResetPasswordForm = new FormGroup({
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirm_password: new FormControl("", [Validators.required]),
    });

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
    const formValue = this.ResetPasswordForm.value;
    let requestData = {};
    requestData["new_password"] = formValue.password;

    if (this.ResetPasswordForm.valid) {
      const headers = new HttpHeaders({
        Authorization: localStorage.getItem("admintoken"),
      });
      this.http.post(`${this.API_URL}resetpassword/${this.userId}`, requestData).subscribe((res: any) => {
        //console.log(res, "changepassword")
        if (res.message === "Password Reset Successfully") {

          if (this.type == "business") {
            this.api.alert(
              res.message,
              "success"
            );
            this.router.navigate([`admin/business-profile/${this.userId}/${this.token}`]);
          } else {
            this.api.alert(
              res.message,
              "success"
            );
            this.router.navigate([""]);
          }
        } else {
          this.api.alert(res.message, "error");
        }
      });
    } else {
      this.ResetPasswordForm.markAllAsTouched();
    }
  }
}
