import { Injectable } from "@angular/core";
import { Router, UrlSegment } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  token: string;
  businessId: string;
  router: any;
  branchStatus: any;
  isVerifed: boolean = false;
  classData: any
  businessToken: string;

  constructor(route: Router) { }

  setData(data: any, classData: any) {
    localStorage.setItem("userdata", JSON.stringify(data));
    localStorage.setItem("classData", JSON.stringify(classData));
  }

  getData() {
    localStorage.getItem("phone");
    localStorage.getItem("email");
    //  localStorage.getItem('data');
  }

  setToken(data: any) {
    this.token = data;
    console.log(this.token , 'businesstoken')
    localStorage.setItem("LoggedIn", this.token);
  }


  setbranchStatus(data: any) {
    this.branchStatus = data;
    localStorage.setItem("branchStatus", this.branchStatus);
  }
  getbranchStatus(data: any) {
    this.branchStatus = data;
    localStorage.getItem("branchStatus");
  }
  // setBusinessId(data: any) {
  //   this.businessId = data;
  //   localStorage.setItem("businessId", this.businessId);
  // }

  getToken() {
    return localStorage.getItem("LoggedIn");
  }
 
  // login hain ya nahi h

  isLoggednIn() {
    return this.getToken() !== null;
  }

  // getAdminToken() {
  //   return localStorage.getItem("admintoken");
  // }

  // isAdminLoggednIn() {
  //   return this.getAdminToken() !== null;
  // }


  // isAuthenticate() {
  //   if (this.token) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // clearUser(key:string) {
  //   return localStorage.removeItem(key);
  // }

  logout() {
    localStorage.removeItem("LoggedIn");
    localStorage.removeItem("userdata");
    localStorage.removeItem("classData");
    localStorage.removeItem("businessId");
    localStorage.removeItem("__admintype");
    localStorage.removeItem("branchStatus");
    localStorage.removeItem("email_verified");
    localStorage.removeItem("load");
  }
}
