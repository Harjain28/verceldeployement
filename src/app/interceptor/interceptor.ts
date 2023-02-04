import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { EventService } from '../services/event.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private event: EventService) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.event.isHttpRequest.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    let TOKEN = localStorage.getItem('LoggedIn')
    if (TOKEN) {
      req = req.clone({
        setHeaders: {
          // 'Content-Type': 'application/json',
          Authorization: TOKEN
        }
      })
    } else {
      req = req.clone({
        setHeaders: {
          // 'Content-Type': 'application/json'
        }
      })
    }

    this.requests.push(req);
    this.event.isHttpRequest.next(true);

    // if(!this.requests[0].url.includes('verifyOTP')) {
    //   this.event.isHttpRequest.next(false);
    // }

    return new Observable((observer: Observer<any>) => {
      const subscription = next.handle(req)
        .subscribe(
          event => {

            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          err => {
            this.removeRequest(req);
            observer.error(err);
          },
          () => {
            this.removeRequest(req);
            observer.complete();
          });
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
