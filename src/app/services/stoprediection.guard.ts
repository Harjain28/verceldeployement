import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EventService, } from './event.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})




export class StoprediectionGuard implements CanActivate {

    constructor(
      private router: Router,
      private event: EventService,
      private storage: StorageService
  
    
    ) { }  
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.storage.isLoggednIn()) {
        return false;
      } else {
        return true;
    }
  }

  
}