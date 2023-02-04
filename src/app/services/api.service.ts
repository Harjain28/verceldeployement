import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EventService } from './event.service';
import Swal from 'sweetalert2';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL: string;
  httpOptions: { headers: HttpHeaders; };
  TOKEN: string;
  ADMINTOKEN: string;
  ROLE: string;
  USERID: string;
  __userId: string;
  private __adminId: string;
  alltags: any;


  constructor(
    private http: HttpClient,
    private event: EventService,
    private storage: StorageService
  ) {
    this.API_URL = environment.BASE_API_ENDPOINT;

    this.TOKEN = localStorage.getItem('LoggedIn')
    if (this.storage.isLoggednIn()) {
      this.TOKEN = localStorage.getItem('LoggedIn')
      this.setHeader();
    }

    // this.ADMINTOKEN = localStorage.getItem('admintoken')

    // if (this.storage.isAdminLoggednIn()) {
    //   this.TOKEN = localStorage.getItem('admintoken')
    //   this.adminSetHeader();
    // }
  }


  // adminSetHeader() {
  //   if (this.ADMINTOKEN !== undefined) {
  //     this.httpOptions = {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         Authorization: this.ADMINTOKEN
  //       })
  //     };
  //   } else {
  //     this.httpOptions = {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //       })
  //     };
  //   }
  // }
  setHeader() {
    if (this.TOKEN !== undefined) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.TOKEN
        })
      };
    } else {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
    }
  }

  public getInfoSection() {
    return this.http.get(`${this.API_URL}getinfosection`).pipe(catchError(this.formatErrors));
  }

  public getBusineesdetails() {
    return this.http.get(`${this.API_URL}businessDetails`).pipe(catchError(this.formatErrors));
  }
  public getAdminBusinessDetails() {
    this.USERID = localStorage.getItem('businessadminid')
    // console.log(this.USERID,"getadminuserid ")
    this.ADMINTOKEN = localStorage.getItem("admintoken");
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("admintoken"),
    });
    return this.http.get(`${this.API_URL}adminbusinessDetails?userId=`+ this.USERID, { headers: headers, }).pipe(catchError(this.formatErrors));
  }

  public getBusinessBranchDetails() {
    this.__userId = localStorage.getItem('__userId')
    this.__adminId = localStorage.getItem('__adminId')
    this.ADMINTOKEN = localStorage.getItem("LoggedIn");
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("LoggedIn"),
    });
    return this.http.get(`${this.API_URL}branchbusinessDetails?userId=${this.__userId}&admin_id=${this.__adminId}`, { headers: headers, }).pipe(catchError(this.formatErrors));
  }
  
  // public publicTagg() {
  //   return this.http.get(`${this.API_URL}gettag`).pipe(catchError(this.formatErrors));
  // }
 
  get(path: string, params: HttpParams = new HttpParams()) {
    return this.http.get(`${this.API_URL}${path}`)
      .pipe(catchError(this.formatErrors));
  }
  // get(path: string, params: HttpParams = new HttpParams()) {
  //   return this.http.get(`${this.API_URL}${path}`, { headers: this.httpOptions, params })
  //     .pipe(catchError(this.formatErrors));
  // }

  post(path: any, body: object = {}) {
    return this.http.post(`${this.API_URL}${path}`, body, this.httpOptions).pipe(catchError(this.formatErrors));
  }


  delete(path: string, params: HttpParams = new HttpParams()) {
    return this.http.delete(`${this.API_URL}${path}`, { headers: this.httpOptions.headers, params }).pipe(map((r: any) => {
      if (alert) {
        this.alert(r.message ? r.message : 'Success', 'success');
      }
    })).pipe(catchError(this.formatErrors));
  }

  upload(path: any, body: FormData) {
    return this.http.put(`${this.API_URL}${path}`, body, this.httpOptions).pipe(map((r: any) => {
      if (alert) {
        this.alert(r.message ? r.message : 'Success', 'success');
      }
    })).pipe(catchError(this.formatErrors));
  }


  alert(message: string, type: any) {
    return Swal.fire({
      title: message,
      icon: type,
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 1000,
      width: '500px',
    });
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }
}


