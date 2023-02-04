import { Component, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { EventService } from './services/event.service';
import { HeaderComponent } from './shared/header/header.component';
import { DisableRightClickService } from './services/disable-right-click';
// import * as firebase from 'firebase';

// const config = {
//   apiKey: 'AIzaSyCNi8EN9RbiJr3AJlfxDgsuhrwjv1xgFjc',
//   databaseURL: 'https://klassbookchat-default-rtdb.asia-southeast1.firebasedatabase.app'
// };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Klassbook';
  alldata: any;
  currentURL: string;

  @ViewChild('myHeader') myHeader: HeaderComponent;
  showHeader: boolean = true;

  constructor(private router: Router,
    private event: EventService, private rightClickDisable: DisableRightClickService) {
    // firebase.initializeApp(config);
  }
  SearchALldata(value: any) {
    // this.searchKey = value;
    // this.SearchALl();
  }


  ngOnInit(): void {
    this.rightClickDisable.disableRightClick();
    this.event.getPosition().then(pos => {
      // console.log(`Positon: ${pos.lng} ${pos.lat}`);
      this.event.userLat = pos.lat;
      this.event.userlng = pos.lng;
    });
    // this.myHeader.loadHeader();
    this.currentURL = this.router.url;
    this.router.events.subscribe((res: any) => {

      if (res instanceof NavigationEnd) {
        this.currentURL = res.url;
        if (this.currentURL.includes('/admin')) {
          this.showHeader = false;
        }
        
        // console.log(this.currentURL , 'url');
        // if (this.currentURL === '/' || this.currentURL === '/view/category' || this.currentURL === '/group/group' || this.currentURL === '/view/events' || this.currentURL === '/view/articles' || this.currentURL === '/view/marketplace' || this.currentURL === '/profile/profile' || this.currentURL === '/view/inbox' || this.currentURL === '/pages/business-details' || this.currentURL === '/pages/business-inbox') {
        //   // this.myHeader.clearSearch();
        //   this.myHeader.clearIcon = false;
        // }
      }
      
    });

  }


}

