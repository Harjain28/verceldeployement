import { Component, OnInit,Compiler} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { API } from '../config';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl  } from '@angular/forms';
import { HttpClientService,HttpIntercepter, HeaderService, LoaderService,CommonService, ManualAuthService,NotificationService } from '../app.service'; 
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Rx';
import {ViewChild, ElementRef} from '@angular/core';
import { HttpClient  } from '@angular/common/http'; 
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { CookieService } from 'ngx-cookie-service';
import { MatTabChangeEvent } from '@angular/material/tabs';

declare let $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { 
  loginForm: FormGroup;
  loginFormpass: FormGroup;
  emailalert:string = "";
  passwordalert:string = "";
  emaildata:string = "";
  isChecked: boolean = false;
  loginemail:boolean = true;

  email = new FormControl(localStorage.getItem('email') , [
    Validators.required,
    Validators.email,
  ]);
  password = new FormControl(localStorage.getItem('password'),
    Validators.required);

  emailPattern  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  constructor(private http1:HttpClient,private router:Router,  
    private http: HttpClientService, 
    private authttp: HttpIntercepter, 
    private headerService: HeaderService, 
    private loader:LoaderService, 
    private activatedRoute: ActivatedRoute, 
    private commons:CommonService, 
    private toastr: ToastrService, 
    private fb: FormBuilder,
    private auth: ManualAuthService, 
    private socialAuthService: AuthService,
    private _compiler: Compiler,
    private cookieService: CookieService,
    private notification:NotificationService) {
      this.loginForm = fb.group({
        'email' : ["", [Validators.required, Validators.email]]
      }); 
      this.loginFormpass = fb.group({
        'password' : ["", [Validators.required]],
      }); 

      this.notification.getHeaderText('login');
      this.notification.getHeaderType('loginheader');
   }

  ngOnInit(): void {
    window.scrollTo(0, 0)
  //   if (this._auth.isLoggedIn()) {
  //     this.router.navigate(['/forgot_password']);
  //  }
  }
  
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData); 
      }
    );
  }
  
 
	// logout(){ 
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('gettoken');
  //   localStorage.removeItem('me');
  //   this.headerService.updateHeader('signup');
  //   this.router.navigate(['/login']);
	// }

  doemail(values){ 
    if(!(this.email.value.match(this.emailPattern))) { 
      return false;
    }else{ 
    this.loader.start();
    let formData = new FormData();
    formData.append('email', this.email.value);  
    return this.authttp.post('is_email_exists',formData).subscribe(
      res => {
      this.loader.stop();
      console.log(res);
      if(res[0].success){
        this.emaildata = this.email.value;
        this.loginemail = false;   
      }
      else{
        this.toastr.error(res[0].message);
      } 
      
    },
    err => {
      this.toastr.error('Something went wrong. Please try again.');
      this.loader.stop();
    });
    }
  }
  
  dologin(values){
    this.loader.start();
    let formData = new FormData();
    formData.append('email', this.email.value); 
    formData.append('password', this.password.value); 
    if(this.isChecked == true){
      localStorage.setItem('email', this.email.value);
      localStorage.setItem('password', this.password.value);
      // this.cookieService.set('email', this.email.value);
      // this.cookieService.set('password', this.password.value);
    }else{
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      // this.cookieService.delete('email');
      // this.cookieService.delete('password');
    }
    return this.authttp.post('userLogin',formData).subscribe(
      res => {
      this.loader.stop();
      console.log(res);
      if(res.status == 200){
        if(res.data['auth_key'] != null){
          this.toastr.success(res.message);
          localStorage.removeItem('token');
          localStorage.setItem('token', 'Bearer '+res.data['auth_key']); 
          this.router.navigate(['/home']); 
        }
        else{
          this.toastr.error("Please check your email to complete your account registration.");
          // this.toastr.error(res.message);
        } 
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

  // signInWithGoogle(){ 
  //   this.socialauthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => { 
  //   this.socialauthService.authState.subscribe((userData) => {
  //     let formData = new FormData();
  //     formData.append('email', userData.email);
  //     formData.append('name', userData.name);
  //     formData.append('image', userData.photoUrl); 
  //     formData.append('appid', "web"); 
  //     formData.append('dob', "");
  //     this.authttp.post('api/socialauthentication',formData)
  //           .subscribe(
  //           res => { 
  //             if(res.status==true){
  //               localStorage.setItem('gettoken', 'Bearer '+res.userid);
  //       localStorage.setItem('gettokenlogi', res.userid);
  //               this.router.navigate(['/home']); 
  //             }  
  //               console.log(res);
  //           },
  //           err => {
  //               this.toastr.error('Something went wrong. Please try again.');
  //               this.loader.stop();
  //           });
  //     }); 
  //  });
// }
// signInWithFB(){
//   this.socialauthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(() => { 
//   this.socialauthService.authState.subscribe((userData) => { 
//       let formData = new FormData();
//       formData.append('email', userData.email);
//       formData.append('name', userData.name);
//       formData.append('image', userData.photoUrl); 
//       formData.append('appid', "web"); 
//       formData.append('dob', "");
//       this.authttp.post('api/socialauthentication',formData)
//             .subscribe(
//             res => { 
//             if(res.status==true){
//               localStorage.setItem('gettoken', 'Bearer '+res.userid);
//               localStorage.setItem('gettokenlogi', res.userid);
//               this.router.navigate(['/home']);
//             }  

//           },
//           err => {
//               this.toastr.error('Something went wrong. Please try again.');
//               this.loader.stop();
//           });
//   }); 
//  });
  // } 

}
