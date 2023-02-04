import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from 'src/app/models/chat';
import { ChatHead } from 'src/app/models/chat-head';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  allchatData: any = [];
  chatList = this.firestore.collection('chat_master').doc('message_list');
  chatHead = this.firestore.collection('chat_master').doc('chat_head');
  id: any;
  classId: any;
  Data: any;
  leaveGroup: any;
  branchuserId: string;
  chatTime: any = [];
  timeStamp: any;
  userType: any;
  userData: any;
  classData: any;

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private event:EventService,
    private api: ApiService,
    private http: HttpClient,
    private route: ActivatedRoute) {


  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userdata'));
    this.classData = JSON.parse(localStorage.getItem('classData'));
    this.getInboxDatafromFirebase();
  }

  // deleteChat(){
  //   this.chatHead.collection(this.id).get().toPromise().then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //      doc.ref.delete();
  //     });
  //   });
  //   this.leaveGroup = !this.leaveGroup;
  // }

  openToggle(recieverId) {
    if (recieverId === false) {
      this.leaveGroup = !this.leaveGroup;
    }else{
      this.branchuserId = recieverId;
      this.getAllChats();
      this.leaveGroup = !this.leaveGroup;
    }
  }
  
  chatHeadVisibility(){
    this.chatHead.collection(this.id).doc(this.branchuserId).update({visibility: false})
    .then(() => {
      this.api.alert("You have successfully deleted all chats", "success");
    })
    .catch(function(error) {
      this.api.alert(error, "error");
    });
    this.chatVisibility();
  }
  
  chatVisibility(){
    if (this.userType === 'business') {
      this.chatTime.forEach(time => {
        this.timeStamp = time;
        this.chatList.collection(this.id + '-' + this.branchuserId).doc(this.timeStamp).update({visibltyBusiness: false})
        .then(() => {
          // console.log('done');
        })
        .catch(function(error) {
         console.error(error);
        });
      });
    }else{
      this.chatTime.forEach(time => {
        this.timeStamp = time;
        this.chatList.collection(this.id + '-' + this.branchuserId).doc(this.timeStamp).update({visibltyUser: false})
        .then(() => {
          // console.log('done');
        })
        .catch(function(error) {
         console.error(error);
        });
      });
    }
    this.getInboxDatafromFirebase();
    this.leaveGroup = !this.leaveGroup;
  }


  getAllChats(){
    this.chatTime = [];
    this.chatList.collection(this.id + '-' + this.branchuserId).get().subscribe(snapshot => {
      if (this.userType === 'business') {
        snapshot.forEach((data) => {
          if (data.data().visibltyBusiness) {
            this.chatTime.push(data.data().time.toString())
          }
        });
      }else{
        snapshot.forEach((data) => {
          if (data.data().visibltyUser) {
            this.chatTime.push(data.data().time.toString())
          }
        });
      }
    })
  }

  private getInboxDatafromFirebase() {
    this.allchatData = [];
    this.userType = this.userData?.type;
    this.id = this.userData?._id;
    this.classId = this.classData?._id;
    this.chatHead.collection(this.id).get().subscribe(snapshot => {
        snapshot.forEach((data) => {
          if (data.data().visibility) {
            this.allchatData.push(data.data());
          }
        });
    });
  }

  private redirectTochat(chatData: any) {
    const classId = 'classId';
    if (this.id === chatData.user_id)  {
      this.router.navigate(["/pages/chat/" + chatData.receiver_id]); 
    } else {
      this.router.navigate(["/pages/chat/" + + chatData.user_id]); 
    }
  }

  back(){
    this.event.back();
  }

}
