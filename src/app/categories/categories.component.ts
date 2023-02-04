import { Component, OnInit ,Compiler} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'; 
import { HeaderService,HttpIntercepter } from '../app.service';  
import {Globals} from '../global';
declare let $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit { 

  public loginid:any="";
  public categoryList:any=[];


  constructor(
    private authttp: HttpIntercepter, 
    private router:Router,
    private headerService: HeaderService, 
    private activatedRoute: ActivatedRoute,
    public notdata:Globals) {

      this.categoryListApi();

     }

  ngOnInit(): void {  
    window.scrollTo(0, 0)
  }
  
  categoryListApi()  {  
      return this.authttp.get('categoryList')
    .subscribe(
    res => {
      this.categoryList = res.data;  
    },
    err => { });
  } 
}

