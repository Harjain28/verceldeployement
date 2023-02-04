import { Component, OnInit ,Compiler} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'; 
import { HeaderService } from '../app.service';  
import {Globals} from '../global';
declare let $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private router:Router,
    private headerService: HeaderService, 
    private activatedRoute: ActivatedRoute,
    public notdata:Globals) {

     }

  ngOnInit(): void {  
  }

}