import { Injectable } from '@angular/core';
import * as firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';


// import firebase from 'firebase/app';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../auth/user.model';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

    user$: Observable<User>;
  logintype: string;
    

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        private api: ApiService,
        private storage: StorageService
    ) { 
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
            // Logged in
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            // Logged out
            return of(null);
          }
        })
      )
    }
    

    async googleSignin() {
      
      const provider = new firebase.default.auth.GoogleAuthProvider();
      //console.log(provider , 'provider');
      const credential = await this.afAuth.signInWithPopup(provider);
      this.logintype = 'google';
      return this.updateUserData(credential.user , this.logintype);
    }

    async facebookSignin() {

      const provider = new firebase.default.auth.FacebookAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      this.logintype = 'facebook';
      return this.updateUserData(credential.user , this.logintype);
    }
       async appleSignin() {
      
      // const provider = new OAuthProvider('apple.com');
      const provider = new firebase.default.auth.OAuthProvider('apple.com');
      //console.log(provider , 'provider');
      const credential = await this.afAuth.signInWithPopup(provider);
      this.logintype = 'apple';
      //console.log(credential , 'appple')
      return this.updateUserData(credential.user , this.logintype);
    }
  
    private updateUserData(user , logintype: any) {
      // Sets user data to firestore on login
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
  
      const data = { 
        uid: user.uid, 
        email: user.email, 
        displayName: user.displayName, 
        photoURL: user.photoURL,
        loginT: logintype
      } 
      this.socialLogin(data);
  
      return userRef.set(data, { merge: true })
  
    }
     socialLogin(data: any) {
      let requestData = {};
      const lat = 0.00;
      const long = 0.00;
          requestData["name"] = data.displayName;
          requestData["email"] = data.email;
          requestData["password"] = '123456';
          requestData["lat"] = lat;
          requestData["long"] = long;
          requestData["logintype"] = data.loginT;
          requestData["type"] = "student";
          this.api.post("sociallogin", requestData).subscribe((res: any) => {
            //console.log(res, 'sociallogin');
            if (res.status == true) {
              this.api.alert(
                "you have sucessfully signed up in Klassbook",
                "success"
              );
              // localStorage.clear();
              this.storage.setToken(res.token);
              this.storage.setData(res.data, res.classData);
              this.router.navigate([""]);
            } else {
              this.api.alert(res.message, "error");
            }
          });
     }
    async signOut() {
      await this.afAuth.signOut();
      // this.router.navigate(['/']);
    }
    }

