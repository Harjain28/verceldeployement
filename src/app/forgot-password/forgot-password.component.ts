import { Component, OnInit,Compiler} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { API } from '../config';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { HttpClientService,HttpIntercepter, LoaderService,NotificationService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';  
declare let $: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup;
  emailalert:string = "";
  passwordalert:string = "";
  emailtext:string = "";
  otptext:string = "";
  userid:string = "";
  otpLay: boolean = false;
  timeLeft: number = 60; 
  interval;
  isresendButton:boolean = false;
  emailPattern  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  constructor(
    private router:Router,   
    private authttp: HttpIntercepter,  
    private loader:LoaderService,  
    private toastr: ToastrService, 
    private fb: FormBuilder,
    private notification:NotificationService) {
      this.forgotForm = fb.group({
        'email' : ["", [Validators.required]],
      }); 
      
      this.notification.getHeaderText('forgotpassword');
      this.notification.getHeaderType('loginheader');
   }
   email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);


  ngOnInit(): void {
    window.scrollTo(0, 0)
  }

  
  validate(values){ 
    if(!(values.email.match(this.emailPattern))) {
      this.emailalert = "Please enter a valid email address";
      return false;
    }else{
      this.doforgot(values);
    }
  }
  
  doforgot(values){
    this.loader.start();
    let formData = new FormData();
    formData.append('email', this.email.value); 
    return this.authttp.post('forgotPassword',formData).subscribe(
      res => {
      this.loader.stop();
      if(res.status == 200){
        this.toastr.success(res.message);
        this.userid = res.data['id'];
        this.emailtext = values?.email;
        this.otpLay = true;
        this.isresendButton = true;
				this.timeLeft = 60;
				this.interval = setInterval(() => {
			      if(this.timeLeft > 0) {
			        this.timeLeft--;
			      } else {
			        this.isresendButton = false;
			      }
			    },1000)
      }
      else{
        this.toastr.error(res.message);
      } 
      
    },
    err => {
      this.toastr.error('Something went wrong. Please try again.');
      this.loader.stop();
    });
  }
  onOtpChange(e){ 
    this.otptext = e;
  }

  otpdone(){    
    this.loader.start();
    let formData = new FormData();
    formData.append('user_id', this.userid); 
    formData.append('otp', this.otptext); 
    return this.authttp.post('verifyOtp',formData).subscribe(
      res => {
      this.loader.stop();
      if(res.status == 200){
        this.toastr.success(res.message); 
        this.forgotForm.reset();
        this.otpLay = false;        
        this.router.navigate(['/reset_password'], { queryParams: { userid: btoa(res.data['id'])}}); 
      }
      else{
        this.toastr.error(res.message);
      } 
      
    },
    err => {
      this.toastr.error('Something went wrong. Please try again.');
      this.loader.stop();
    });
  }

  
  resend(){
    this.loader.start();
    let formData = new FormData();
    this.timeLeft = 60;
    formData.append('email', this.emailtext); 
    return this.authttp.post('resendotp',formData).subscribe(
      res => {
      this.loader.stop();

      if(res.status == 200){
        this.toastr.success(res.message);
        this.userid = res.status;
        this.isresendButton = true;
				this.timeLeft = 60;
				this.interval = setInterval(() => {
			      if(this.timeLeft > 0) {
			        this.timeLeft--;
			      } else {
			        this.isresendButton = false;
			      }
			    },1000)
      }
      else{
        this.toastr.error(res.message);
      } 
      
    },
    err => {
      this.toastr.error('Something went wrong. Please try again.');
      this.loader.stop();
    });
  }

}
