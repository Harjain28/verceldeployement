import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class EventService {
  constructor(private storage: StorageService, private location:Location) { }
  adminData: any
  adminBusinessDetails: any = [];
  adminSideBarData: any = [];
  infoTextData: any = [];
  businessDetails: any;
  sectionData: any = [];
  bannerImageDesktop: any = [];
  bannerImageMobile: any = [];
  SubcategoryData: any = [];
  sectionInfo: any = [];
  categoryData: any = [];
  tagsData: any = [];
  verified: boolean = false;
  data: Subject<any> = new Subject();
  positionData: Subject<any> = new Subject();
  position: { lat: number, lng: number };
  address1: any;
  NotApplicableArray = [];
  selectlevelName = '';
  articalTag:number = 0;
  groupTag:number = 0;
  indexSelected:number = 0;
  selectedBranch:any = '';
  selectedLevelSearch = [];
  AgeFromSearch = '';
  AgetoSearch = '';
  dateFromSearch = 1;
  dateToSearch = 18;
  searchType = '';
  checkVal = '';
  selectedLevelName = [];
  Ageto = '';
  AgeFrom = '';
  type = 'all';
  timeType = 'upcoming';
  eventType = '';
  sort = 'Date';
  otherType = '';
  searchKey = '';
  userLat = 0;
  userlng = 0;
  businessName: any = "";
  businessPersonName: any = "";
  Login = new BehaviorSubject(this.storage.isLoggednIn());
  isLogin = this.Login.asObservable();

  Verified = new BehaviorSubject(true);
  IsVerified = this.Verified.asObservable();

  isHttpRequest = new Subject<boolean>();

  private Loading = new BehaviorSubject(true);
  isLoading = this.Loading.asObservable();

  private searchData = new BehaviorSubject<any>({ sharedata: '' });
  private HomesearchData = new BehaviorSubject<any>({ homeshareddata: '' });

  private editProf = new Subject<any>();
  
    
  private ShowArrow = new Subject<any>();
  sendShowArrow(){
  this.ShowArrow.next();
  }
  getShowArrow():Observable<any>{
    return this.ShowArrow.asObservable();
  }
  
  // postalAddressGlobal(postal) {
  //   var geocoder = new google.maps.Geocoder();
  //   geocoder.geocode({
  //     'address': postal,
  //     componentRestrictions: {
  //       country: 'SG',
  //     }
  //   }, (results, status) => {
  //     if (status === 'OK') {
  //       this.position = {
  //         "lat": results[0].geometry.location.lat(),
  //         "lng": results[0].geometry.location.lng()
  //       }
  //       this.positionData.next(this.position);
  //     }
  //     this.getReverseGeocodingData(this.position.lat, this.position.lng);
  //   });
  // }

  // getReverseGeocodingData(lat, lng) {
  //   let latlng = new google.maps.LatLng(lat, lng);
  //   // This is making the Geocode request
  //   var geocoder = new google.maps.Geocoder();
  //   geocoder.geocode({ location: latlng }, (results, status) => {
  //     if (status === 'OK') {
  //       let address = (results[0].formatted_address);
  //       this.address1 = address.split(",")[0];
  //       this.data.next(this.address1);
  //       // return this.address1;
  //     }
  //   });
  // }

 getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });
  }

  back(){
    this.location.back();
  }

  private sharefunc = new Subject<any>();
  sendResetEvent(){
  this.sharefunc.next();
  }

  private UpdateSideBar = new Subject<any>();
  sendUpdateSideBar(){
  this.UpdateSideBar.next();
  }
  getUpdateSideBar():Observable<any>{
    return this.UpdateSideBar.asObservable();
  }
  
  getResetEvent():Observable<any>{
    return this.sharefunc.asObservable();
  }

  sendEditEvent(){
  this.editProf.next();
  }
  getEditEvent():Observable<any>{
    return this.editProf.asObservable();
  }
   
  setHeaderSearchdata(data: any) {
    this.searchData.next(data);
  }

  getHeaderSearchdata() {
    return this.searchData.asObservable();
  }

  setHomeSearchData(data: any) {
    this.HomesearchData.next(data);
  }

  getHomeSearchData() {
    return this.HomesearchData.asObservable();
  }

  copyClipboard() {
    var inputc = document.body.appendChild(document.createElement("input"));
    inputc.value = window.location.href;
    inputc.focus();
    inputc.select();
    document.execCommand('copy');
    inputc.parentNode.removeChild(inputc);
  }

  setLoginEmmit(isLogin: boolean) {
    return this.Login.next(isLogin);
  }

  setLoaderEmmit(isLoading: boolean) {
    return this.Loading.next(isLoading);
  }

}
