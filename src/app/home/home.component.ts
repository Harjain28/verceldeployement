import { Component, OnInit ,Compiler} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'; 
import { HeaderService,NotificationService } from '../app.service';  
import {Globals} from '../global';
declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router:Router,
    private headerService: HeaderService, 
    private activatedRoute: ActivatedRoute,
    public notdata:Globals,
    private notification:NotificationService) {

      this.notification.getHeaderText('home');
      this.notification.getHeaderType('login');

     }

  ngOnInit(): void {  
    window.scrollTo(0, 0)
  }

}
