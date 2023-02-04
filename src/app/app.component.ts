import { Component } from '@angular/core';
import { API } from './config';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService, HeaderService, ManualAuthService } from './app.service';   
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gramginie';
  loading: boolean = false;
  load: boolean = false;
  subscription: Subscription;
  mode: string;


  constructor(private loaderService: LoaderService,private headerService: HeaderService,private auth: ManualAuthService){ 
    if (this.auth.isLoggedIn()) {
			this.mode='login';
		}else{
			this.mode='signup';
		}
  		// this.findmainbanner();
	}
	ngOnInit(){
		this.subscription = this.headerService.header.subscribe((mode) => {
			this.mode = mode;
		});
		this.subscription = this.loaderService.loader.subscribe((mode) => {
			this.load = mode;
		})
	} 

}

