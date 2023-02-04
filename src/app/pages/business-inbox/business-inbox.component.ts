import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
import { Chat } from 'src/app/models/chat';
import { ChatHead } from 'src/app/models/chat-head';


@Component({
  selector: 'app-business-inbox',
  templateUrl: './business-inbox.component.html',
  styleUrls: ['./business-inbox.component.scss']
})
export class BusinessInboxComponent implements OnInit {
  allchatData: any[];
  chatHead = this.firestore.collection('chat_master').doc('chat_head');
  chatList = this.firestore.collection('chat_master').doc('message_list');
  userId: any;
  id: any;
  classId: any;
  image: any;
  Data: any;
  leaveGroup: boolean;
  branchuserId: any;
  userType: any;
  chatTime: any = [];
  timeStamp: any;
  userData: any;
  classData: any;

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private api: ApiService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location) {

  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userdata'));
    this.classData = JSON.parse(localStorage.getItem('classData'));
    this.getChatHeads();
  }

  getChatHeads() {
    this.allchatData = [];
    this.userType = this.userData.type;
    this.id = this.userData?._id;
    this.classId = this.classData?._id;
    this.image = this.classData?.image;
    this.chatHead.collection(this.id).get().subscribe(snapshot => {
      snapshot.forEach((data) => {
        if (data.data().visibility) {
          this.allchatData.push(data.data());
        }
      })
    });

  }

  openToggle(recieverId) {
    if (recieverId === false) {
      this.leaveGroup = !this.leaveGroup;
    } else {
      this.branchuserId = recieverId;
      this.getAllChats();
      this.leaveGroup = !this.leaveGroup;
    }
  }

  chatHeadVisibility() {
    this.chatHead.collection(this.id).doc(this.branchuserId).update({ visibility: false })
      .then(() => {
        this.api.alert("You have successfully deleted all chats", "success");
      })
      .catch(function (error) {
        this.api.alert(error, "error");
      });
    this.chatVisibility();
  }

  chatVisibility() {
    this.chatTime.forEach(time => {
      this.timeStamp = time;
      this.chatList.collection(this.branchuserId + '-' + this.id).doc(this.timeStamp).update({ visibltyBusiness: false })
        .then(() => {
          console.log('done');
        })
        .catch(function (error) {
          console.error(error);
        });
    });
    this.leaveGroup = !this.leaveGroup;
    this.getChatHeads();
  }

  getAllChats() {
    this.chatList.collection(this.branchuserId + '-' + this.id).get().subscribe(snapshot2 => {
      if (snapshot2.size === 0) {
        console.log('no messages')
      } else {
        if (this.userType === 'business') {
          snapshot2.forEach((data) => {
            if (data.data().visibltyBusiness) {
              this.chatTime.push(data.data().time.toString())
            }
          });
        }
      }
    });
  }


  back() {
    this.location.back();
  }

  private redirectTochat(chatData: any) {
    const classId = 'classId';
    if (this.id === chatData.user_id) {
      this.router.navigate(["/pages/chat/" + chatData.receiver_id]);
    } else {
      this.router.navigate(["/pages/chat/" + + chatData.user_id]);
    }
  }
}
