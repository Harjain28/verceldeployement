import { Component, OnInit, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClientService,HttpIntercepter, HeaderService, LoaderService,CommonService, ManualAuthService } from '../app.service'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  index: number;
  filePath: string;
  imgUpload: FormGroup;
  phone: string = '';
  zip: string = '';
  street: string = '';
  Apt: string = '';
  country: string = '';
  city: string = '';
  selectedTab = 0;
  otptext:string = "";
  otpForm: boolean =false;
  public userData : any;
  address: string = '';
  description: any = '';
  photo: any = '';
  followers: any = '';
  following: any = '';
  insta_followers: any = '';
  insta_following: any = '';
  insta_username: any = '';
  name: any = '';
  chat: any = '';
  past_work_contracts: any = '';
  profile_status: any = '';
  rate: any = ''; 
  locationForm: FormGroup
  number: any = '';
  username: string = '';
  imageUpload: string[];
  myTag: any = '';
  isClassOneActive: boolean[] = [];

  constructor(
    private fb: FormBuilder, 
    private authttp: HttpIntercepter,  
    private loader:LoaderService,  
    private toastr: ToastrService, 
    private el: ElementRef
    ) { 
    this.imgUpload = this.fb.group({
      img: [null],
      filename: ['']
    })
    this.locationForm = this.fb.group({})
  }

  ngOnInit(): void {
    this.authttp.get('userfulldetails').subscribe(
      res=>{
        console.log(res);
        this.userData = res[0];
      });
  }

  back() {
    this.selectedTab -= 1;
  }

  next(){
    this.selectedTab +=1;
  }

  change(){
    this.otpForm = !this.otpForm;
  }

  imagePreview(e: any) {
    this.loader.start();
    const file = e.target.files[0];
    this.imgUpload.patchValue({
      img: file
    });
    this.imgUpload.get('img')?.updateValueAndValidity()
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
      this.imageUpload = this.filePath.split(',');
      console.log(this.imageUpload);
      let formData = new FormData();
      formData.append('image', this.imageUpload[1]); 
      return this.authttp.post('imageUploadUser',formData).subscribe(
        res =>{
          this.loader.stop();
          console.log(res);
          if(res[0].success == true){
            this.isClassOneActive[this.selectedTab-1] = true;
          this.isClassOneActive[this.selectedTab] = true;
          this.selectedTab += 1;
          this.toastr.success(res[0].message);        
          }
        },
        err => {
          this.toastr.error('Something went wrong. Please try again.');
          this.loader.stop();
      });
    }
    reader?.readAsDataURL(file)
  }

  addPhone(){
    this.loader.start();
    let getPhone = new FormData();
    getPhone.append('mobile', this.phone);
    return this.authttp.post('verifyMobileNumber', getPhone).subscribe(
      res=>{
        this.loader.stop();
        if(res[0].success == true){
          this.otpForm = !this.otpForm;  
          this.toastr.success(res[0].message);      
        }   
      },
      err => {
        this.toastr.error('Something went wrong. Please try again.');
        this.loader.stop();
      });
  }

  addLocation(){
    this.loader.start();
    let getLocation = new FormData();
    getLocation.append('address', this.street );
    getLocation.append('country', this.country);
    getLocation.append('apt_suite', this.Apt);
    getLocation.append('city', this.city);
    getLocation.append('zip_postal_code', this.zip);
    return this.authttp.post('location', getLocation).subscribe(
      res=>{
        this.loader.stop();
        if(res[0].success == true){
          this.isClassOneActive[3] = true;
          this.toastr.success(res[0].message);
        }
      },
      err =>{
        this.toastr.error('Something went wrong. Please try again.');
        this.loader.stop();
    });
  }

  onOtpChange(e){ 
    this.otptext = e;
  }

  verifyOtp(){
    this.loader.start();
    let getData = new FormData();
    getData.append('mobile', this.phone);
    getData.append('code', this.otptext);
    return this.authttp.post('verifyCode', getData).subscribe(
      res=>{
        this.loader.stop();
        if(res[0].success == true){
          this.isClassOneActive[this.selectedTab] = true;
          this.selectedTab += 1;
          this.toastr.success(res[0].message);
        }
        else{
          this.toastr.error(res[0].message);
        }
      }, 
      err =>{
        this.toastr.error('Something went wrong. Please try again.');
        this.loader.stop();
      });
  }

  resend(){
    this.loader.start();
    let getReData = new FormData();
    getReData.append('mobile', this.phone);
    return this.authttp.post('verifyMobileNumber', getReData).subscribe(
      res=>{
        this.loader.stop();
        if(res[0].success == true){
          this.toastr.success(res[0].message);
        }
        else{
          this.toastr.error(res[0].message);
        }
      },
      err =>{
        this.toastr.error('Something went wrong. Please try again.');
        this.loader.stop();
      });
  }

  instaData(){
    this.loader.start();
    let getInstaData = new FormData();
    getInstaData.append('name', this.userData?.name);
    getInstaData.append('following', this.userData?.insta_following);
    getInstaData.append('followers',this.userData?.insta_following);
    getInstaData.append('profile_status',this.userData?.profile_status);
    getInstaData.append('chat',this.userData?.chat);
    getInstaData.append('past_work_contracts',this.userData?.past_work_contracts);
    getInstaData.append('description',this.userData?.description);
    getInstaData.append('rate',this.userData?.rate);
    getInstaData.append('insta_following',this.userData?.insta_following);
    getInstaData.append('insta_followers',this.userData?.insta_followers);
    getInstaData.append('insta_username',this.username);
    getInstaData.append('phone',this.userData?.phone);
    return this.authttp.post('editprofile', getInstaData).subscribe(
      res=>{
        this.loader.stop();
        if(res[0].success == true){
          this.isClassOneActive[this.selectedTab] = true;
          this.toastr.success(res[0].message);
        }
        else{
          this.toastr.error(res[0].message);
        }
      },
      err =>{
        this.toastr.error('Something went wrong. Please try again.');
        this.loader.stop();
      });

  }
  // currentdate = new Date();
  // onemonth= new Date();
  // qtr= new Date();
  // half= new Date();
  // full= new Date();
  // onOptionsSelected(value: any){
  //   this.currentdate = new Date(value);
  //   console.log(this.currentdate);
  //   this.onemonth =new Date(value);
  //   this.qtr= new Date(value);
  //   this.half= new Date(value);
  //   this.full= new Date(value);
  //   this.onemonth = new Date(this.onemonth.setDate(this.currentdate.getDate() + 30))
  //   this.qtr = new Date(this.qtr.setDate(this.currentdate.getDate() + 120))
  //   this.half = new Date(this.half.setDate(this.currentdate.getDate() + 180))
  //   this.full = new Date(this.full.setDate(this.currentdate.getDate() + 365))
  // }

}
