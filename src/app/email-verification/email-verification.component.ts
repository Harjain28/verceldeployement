import { Component, OnInit ,Compiler} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';
import { HeaderService,HttpIntercepter,LoaderService,NotificationService } from '../app.service';  
import {Globals} from '../global';
declare let $: any;

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  email: string;
  type: string;
  values: any;
  resendForm: FormGroup;

  constructor(
    private router:Router,
    private headerService: HeaderService, 
    private activatedRoute: ActivatedRoute,
    private authttp: HttpIntercepter,
    public notdata:Globals,
    private fb: FormBuilder,
    private loader:LoaderService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private notification:NotificationService) {

      this.notification.getHeaderText('emailverify');
      this.notification.getHeaderType('login');

      this.resendForm = this.fb.group({
        'email' : ["", [Validators.required, Validators.email]],
      })

      

     }

  ngOnInit(): void {  
    window.scrollTo(0, 0)
    this.headerService.userType$.subscribe(
      email => {
        this.email = email;
    }); 
    this.route.queryParamMap
      .subscribe(params => { 
        this.type = params.get('type');
        console.log('Query params ',this.type) 
    });
    this.values = JSON.parse(sessionStorage.getItem('values'));
    console.log(this.values);
    
  }

  change(){
    this.loader.start();
    let formData = new FormData();
    formData.append('firstname', this.values['fname']); 
    formData.append('lastname',this.values['lname']); 
    formData.append('password',this.values['password']);
    formData.append('email',this.resendForm.get('email').value);
    formData.append('country', this.values['country']); 
    formData.append('username', this.values['username']); 
    formData.append('type', this.values['type']);
    return this.authttp.post('influencer_signup', formData).subscribe(
      res=>{
        console.log(res);
        this.loader.stop();
        if(res[0].success == true){
          this.toastr.success(res[0].message);
          $("#resendModal").modal("hide");
          this.values['email']= this.resendForm.get('email').value;
          sessionStorage.setItem('values',  JSON.stringify(this.values));
          console.log(sessionStorage.getItem('values'));
          
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

  resend(){
    this.loader.start();
    let formData = new FormData();
    formData.append('email', this.values['email']); 
    return this.authttp.post('influencer_resendotp',formData).subscribe(
      res => {
      this.loader.stop();
      console.log(res);
      if(res.success == true){
        this.toastr.success(res.message);
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
