import { Component, OnInit,Compiler} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { API } from '../config';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, ValidatorFn, ValidationErrors, FormControlName  } from '@angular/forms';
import { HttpClientService,HttpIntercepter, HeaderService, LoaderService,CommonService, ManualAuthService,NotificationService, AppService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Rx';
import {ViewChild, ElementRef} from '@angular/core';
import { HttpClient  } from '@angular/common/http';  
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MustMatch } from '../_helpers/must-match.validator';
declare let $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  otpForm: FormGroup;
  emailalert:string = "";
  emailtext:string = "";
  otptext:string = "";
  userid:string = "";
  passwordalert:string = "";
  cpasswordalert:string = "";
  typealert:string = "";
  otpLay: boolean = false;
  timeLeft: number = 60; 
  interval;
  isresendButton:boolean = false;
  checked : boolean = false;
  type: string;
  userType: string;
  selectedTab : number;
  uType: string;

  constructor(private http1:HttpClient,private router:Router,  
    private http: HttpClientService, 
    private authttp: HttpIntercepter, 
    private headerService: HeaderService, 
    private loader:LoaderService, 
    private activatedRoute: ActivatedRoute, 
    private commons:CommonService, 
    private toastr: ToastrService, 
    private fb: FormBuilder,
    private route : ActivatedRoute,
    private auth: ManualAuthService,
    private _compiler: Compiler,
    private notification:NotificationService) {
      this.registerForm = fb.group({
        'fname' : ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z]+$')]],
        'lname' : ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z]+$')]],
        'email' : ["", [Validators.required, Validators.email]],
        'password' : ["", [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')]],
        'cpassword' : ["", [Validators.required, Validators.minLength(8)]],
        'username' : [''],
        'country' : ['', [Validators.required]],
        'check' : [false, [Validators.requiredTrue]],
      },{
        validator: MustMatch('password', 'cpassword')
    }); 
      this.notification.getHeaderText('register');
      this.notification.getHeaderType('loginheader');
   }

  ngOnInit(): void { 
    window.scrollTo(0, 0)
    this.headerService.userType$.subscribe(
      type => {
    });  
    this.route.queryParams
    .subscribe(params => { 
      this.userType = params['type'];
     if(this.userType == 'Business owner'){
      this.selectedTab = 0;
    }
    else{
      this.selectedTab = 1;
    }
    });
  }

  // validate(values){ 
  //   console.log(values);
  //   if(!(values.email.match(this.emailPattern))) { 
  //     return false;
  //   }else if(values.password == "") { 
  //     this.emailalert = "";
  //     return false;
  //   }else if(values.cpassword != values.password) { 
  //     this.passwordalert = "";
  //     return false;
  //   }else if(values.regType == "") { 
  //     this.cpasswordalert = "";
  //     return false;
  //   }else{
  //     alert('hi');
  //     this.typealert = "";
  //     this.doregister(values);
  //   }
  // }

  // okay(){
  //     this.toastr.error('Hello world!', 'Toastr fun!');
  // }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('index => ', tabChangeEvent.index);
    if(tabChangeEvent.index == 0){
      this.userType = "Business owner";
    }
    else{
      this.userType = "Influencer"
    }
  }

  onChkChange(ob: MatCheckboxChange) {
    console.log("checked: " + ob.checked);
    this.checked = ob.checked;
 } 

  register(){
    this.loader.start();
    let formData = new FormData();
    formData.append('firstname', this.registerForm.get('fname').value); 
    formData.append('lastname',this.registerForm.get('lname').value); 
    formData.append('password',this.registerForm.get('password').value);
    formData.append('email',this.registerForm.get('email').value);
    formData.append('country', this.registerForm.get('country').value); 
    formData.append('username', this.registerForm.get('username').value); 
    formData.append('type', this.userType);
    if(this.checked == false){
      this.toastr.error('Please accept terms and condition.');
    }
    return this.authttp.post('influencer_signup', formData).subscribe(
      res=>{
        console.log(res);
        this.loader.stop();
        if(res[0].success == true){
          this.toastr.success(res[0].message);
          console.log(this.registerForm.value);
          sessionStorage.setItem('values',JSON.stringify(this.registerForm.value))
          this.router.navigate(['/email_verification'], { queryParams: { type: this.userType }} );
        }
        else{
          this.toastr.error(res[0].message);
        }
        this.headerService.publishData(this.registerForm.get('email').value);
      },
      err => {
        this.toastr.error('Something went wrong. Please try again.');
        this.loader.stop();
      });
  }

  // doregister(values){
  //   this.loader.start();
  //   let formData = new FormData();
  //   formData.append('email', this.email.value); 
  //   formData.append('password', this.password.value); 
  //   formData.append('type',this.country.value); 
  //   return this.authttp.post('userRegister',formData).subscribe(
  //     res => {
  //       console.log(res);
  //     this.loader.stop();
  //     if(res.status == 200){
  //       this.toastr.success(res.message);
  //       this.userid = res.user_id;
  //       this.emailtext = values?.email;
  //       this.otpLay = true;
  //       this.isresendButton = true;
	// 			this.timeLeft = 60;
	// 			this.interval = setInterval(() => {
	// 		      if(this.timeLeft > 0) {
	// 		        this.timeLeft--;
	// 		      } else {
	// 		        this.isresendButton = false;
	// 		      }
	// 		    },1000)
  //     }
  //     else{
  //       this.toastr.error(res.message);
  //     } 
      
  //   },
  //   err => {
  //     this.toastr.error('Something went wrong. Please try again.');
  //     this.loader.stop();
  //   });
  // }

  // onOtpChange(e){ 
  //   this.otptext = e;
  // }

  // otpdone(){    
  //   this.loader.start();
  //   let formData = new FormData();
  //   formData.append('user_id', this.userid); 
  //   formData.append('otp', this.otptext); 
  //   console.log(this.userid, this.otptext);
    
  //   return this.authttp.post('verifyOtp',formData).subscribe(
  //     res => {
  //     this.loader.stop();
  //     if(res.status == 200){
  //       this.toastr.success(res.message); 
  //       this.registerForm.reset();
  //       this.otpLay = false;        
  //       this.router.navigate(['/login']); 
  //     }
  //     else{
  //       this.toastr.error(res.message);
  //     } 
      
  //   },
  //   err => {
  //     this.toastr.error('Something went wrong. Please try again.');
  //     this.loader.stop();
  //   });
  // }
  // resend(){
  //   this.loader.start();
  //   let formData = new FormData();
  //   this.timeLeft = 60;
  //   formData.append('email', this.emailtext); 
  //   return this.authttp.post('resendotp',formData).subscribe(
  //     res => {
  //     this.loader.stop();

  //     if(res.status == 200){
  //       this.toastr.success(res.message);
  //       this.userid = res.status;
  //       this.isresendButton = true;
	// 			this.timeLeft = 60;
	// 			this.interval = setInterval(() => {
	// 		      if(this.timeLeft > 0) {
	// 		        this.timeLeft--;
	// 		      } else {
	// 		        this.isresendButton = false;
	// 		      }
	// 		    },1000)
  //     }
  //     else{
  //       this.toastr.error(res.message);
  //     } 
      
  //   },
  //   err => {
  //     this.toastr.error('Something went wrong. Please try again.');
  //     this.loader.stop();
  //   });
  // }

}
