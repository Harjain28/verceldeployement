import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Chat } from 'src/app/models/chat';
import { ChatHead } from 'src/app/models/chat-head';
import { EventService } from 'src/app/services/event.service';
@Component({
  selector: 'app-business-inbox',
  templateUrl: './business-inbox.component.html',
  styleUrls: ['./business-inbox.component.scss']
})
export class BusinessInboxComponent implements OnInit {
  allchatData: any[];
  chatHead = this.firestore.collection('chat_master').doc('chat_head');
  userId: any;
  id: any;
  classId: any;
  constructor(private firestore: AngularFirestore,
    private router: Router,
    private api: ApiService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private event: EventService) {

  }

  ngOnInit(): void {
    this.allchatData = [];
    const userData = JSON.parse(localStorage.getItem('userData'));
    const classData = JSON.parse(localStorage.getItem('classData'));
    this.classId = classData?._id;
    this.id = userData?._id;
    this.chatHead.collection(this.id).get().subscribe(snapshot => {
      snapshot.forEach((data) => {
        this.allchatData.push(data.data());
      })
      //console.log(this.allchatData);
    });
  }

  back(){
    this.event.back();
  }

}
