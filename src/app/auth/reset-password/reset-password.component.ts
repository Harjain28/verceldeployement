import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  showSuccesMessage: boolean = false;
  IsSubmitBool: boolean = false;
  emailId: any = '';

  constructor(
     private storage: StorageService,
    private event: EventService,
    private api: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,4}$')]),
    });
  }
  
  resetPassword() {
    this.IsSubmitBool = true;
    const formValue = this.form.value;
    const requestData = {}
    requestData['email'] = formValue.email;
    if (this.form.valid) {
      this.api.post('forgotpassword', requestData).subscribe((res: any) => {
        if (res.status == true) {
          let userType = res.data.type;
            this.IsSubmitBool = false;
           this.showSuccesMessage = true;
           this.emailId = formValue.email;
           if (userType === 'business') {
            localStorage.setItem("userdata", JSON.stringify(res.data));
            localStorage.setItem("forgetPass", 'yes');
            this.router.navigate(["/email-verify"]);
           }
        }  else {
          this.showSuccesMessage = true;
          this.IsSubmitBool = false;
        }
      });
    } else {
      this.IsSubmitBool = false;
      this.form.markAllAsTouched();
    }
  }
  
}
