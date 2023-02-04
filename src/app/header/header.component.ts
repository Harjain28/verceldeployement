import { Component, OnInit ,Compiler, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router'; 
import { AppService, HeaderService,HttpIntercepter } from '../app.service';  
import {Globals} from '../global';
declare let $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public loginid:any="";
  public userdatass:any=[];
  public categoryList:any=[];
  @Input() vertical: true;
  chooseForm: FormGroup;
  userType: string;

  constructor(
    private authttp: HttpIntercepter, 
    private router:Router,
    private headerService: HeaderService, 
    private activatedRoute: ActivatedRoute,
    private fb : FormBuilder,
    public notdata:Globals) {
      this.chooseForm = this.fb.group({
        'check' : ['', Validators.required],
        'type' : ['', Validators.required]
      });
      this.accountdata();
      this.categoryListApi();
     }

     choose(){
      this.userType = this.chooseForm.get('type').value;
      this.headerService.publishData(this.userType);
      $("#signupwindow").modal("hide");
     }

  ngOnInit(): void {  
    if(!(localStorage.getItem('token')) || (localStorage.getItem('token')) == null || (localStorage.getItem('token')) == 'undefined'){
      this.loginid="";
      }else{
      this.loginid = localStorage.getItem('token');
    }
  }
  
  accountdata()  {  
      return this.authttp.get('userfulldetails')
    .subscribe(
    res => {
      this.userdatass = res[0];  
      console.log(this.userdatass);
      
    },
    err => { });
  }
  
  categoryListApi()  {  
    return this.authttp.get('categoryList')
  .subscribe(
    res => {
      this.categoryList = res.data;  
    },
    err => { });
} 
  
	logout(){ 
    localStorage.removeItem('token');
    this.headerService.updateHeader('loginheader');
    this.router.navigate(['/login']);
	}
}
