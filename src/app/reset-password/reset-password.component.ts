import { Component, OnInit,Compiler} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { API } from '../config';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { HttpClientService,HttpIntercepter, LoaderService ,NotificationService} from '../app.service'; 
import { ToastrService } from 'ngx-toastr';  
import { MustMatch } from '../_helpers/must-match.validator';
declare let $: any;


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup; 
  userid:string = ""; 
  passwordalert:string = ""; 
  cpasswordalert:string = ""; 
  emailPattern  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  password = new FormControl('',Validators.required);
  cpassword = new FormControl('',[Validators.required]);
  constructor(
    private router:Router,   
    private authttp: HttpIntercepter,  
    private loader:LoaderService,  
    private toastr: ToastrService, 
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private notification:NotificationService) {
      this.resetForm = fb.group({
        'password' : ["", [Validators.required, Validators.minLength(8)]],
        'cpassword' : ["", [Validators.required, Validators.minLength(8)]],
      },
      {
      validator: MustMatch('password', 'cpassword')
    }); 
      this.activatedRoute.queryParams.subscribe(params => {
          this.userid = atob(params['userid']);   
      });    
      this.notification.getHeaderText('resetpassword');
      this.notification.getHeaderType('loginheader');{
        
   }
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
  }

  validate(values){ 
    if(values.password == "") {
      this.passwordalert = "Please enter password";
      this.cpasswordalert = "";
      return false;
    }else if(values.cpassword != values.password) {
      this.cpasswordalert = "Password doesn't match";
      this.passwordalert = "";
      return false;
    }else{
      this.doreset(values);
    }
  }
  
  doreset(values){
    this.loader.start();
    let formData = new FormData();
    formData.append('password', this.resetForm.get('password').value); 
    formData.append('user_id', this.userid); 
    return this.authttp.post('changePass',formData).subscribe(
      res => {
      this.loader.stop();
      if(res.status == 200){
        this.toastr.success(res.message);        
        this.router.navigate(['/login']); 
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
