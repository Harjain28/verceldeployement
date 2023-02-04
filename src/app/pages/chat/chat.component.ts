import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Chat } from 'src/app/models/chat';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ChatHead } from 'src/app/models/chat-head';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {
  userId: any;
  branchuserId: any;
  chatList = this.firestore.collection('chat_master').doc('message_list');
  userList = this.firestore.collection('chat_master').doc('isOnline');
  chatHead = this.firestore.collection('chat_master').doc('chat_head');
  allchatData: any;
  firstTimeChat = false;
  submitchat: any;
  collectionId = '';
  messageDateString: string;
  loading: boolean = false;
  allClassDetails: any;
  classId: any;
  type: any;
  allProductData: any;
  imageBox: boolean = false;
  myFiles: any = [];
  image: any = [];
  index: number;
  branchName: any;
  classdataSize: number;
  userName: any;
  Data: any;
  userimage: any;
  classData: any;
  pipupImage: any;
  leaveGroup: boolean;
  chatTime: any = [];
  timeStamp: any;
  time: any;
  userType: any;
  userData: any;

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase,
    private router: Router,
    private api: ApiService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.route.params.subscribe((params) => {
      this.branchuserId = params["adminid"];
      this.api.get('getuserbyId?userId=' + this.branchuserId).subscribe((res: any) => {
        this.classData = res.classData;
        this.Data = res.userData;
      });
    });
  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userdata'));
    if (this.userData?.type === 'business') {
      const classData = JSON.parse(localStorage.getItem('classData'));
    }
    this.getAllChats();
  }

  // chatVisibility(){
  //   this.chatTime.forEach(time => {
  //     this.timeStamp = time;
  //     this.chatList.collection(this.userId + '-' + this.branchuserId).doc(this.timeStamp).update({visibility: false})
  //     .then(() => {
  //       console.log('done');
  //     })
  //     .catch(function(error) {
  //      console.error('Error writing document: ', error);
  //     });
  //   });
  //   this.leaveGroup = !this.leaveGroup;
  // }

  getAllChats() {
    this.allchatData = [];
    this.userType = this.userData.type;
    console.log(this.userType);
    this.userId = this.userData?._id;
    this.userName = this.userData?.name;
    this.userimage = this.userData?.image;
    this.chatList.collection(this.userId + '-' + this.branchuserId).get().subscribe(snapshot => {
      if (snapshot.size === 0) {
        this.chatList.collection(this.branchuserId + '-' + this.userId).get().subscribe(snapshot2 => {
          if (snapshot2.size === 0) {
            this.collectionId = this.userId + '-' + this.branchuserId;
            this.firstTimeChat = true;
            this.submitchat = '';
          } else {
            this.collectionId = this.branchuserId + '-' + this.userId;
            if (this.userType === 'business') {
              snapshot2.forEach((data) => {
                if (data.data().visibltyBusiness) {
                  this.allchatData.push(data.data());
                  this.submitchat = '';
                }
              });
            } else {
              snapshot2.forEach((data) => {
                if (data.data().visibltyUser) {
                  this.allchatData.push(data.data());
                  this.submitchat = '';
                }
              });
            }
          }
        });
      } else {
        if (this.userType === 'business') {
          this.collectionId = this.userId + '-' + this.branchuserId;
          snapshot.forEach((data) => {
            if (data.data().visibltyBusiness) {
              this.allchatData.push(data.data());
              this.submitchat = '';
              this.myFiles = [];
              this.image = [];
            }
          });
        } else {
          this.collectionId = this.userId + '-' + this.branchuserId;
          snapshot.forEach((data) => {
            if (data.data().visibltyUser) {
              this.allchatData.push(data.data());
              this.submitchat = '';
              this.myFiles = [];
              this.image = [];
            }
          });
        }
      }
    });
  }

  // deleteChat(){
  //   this.chatList.collection(this.userId + '-' + this.branchuserId).get().toPromise().then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //      doc.ref.delete();
  //     });
  //   });
  //   this.leaveGroup = !this.leaveGroup;
  // }

  openToggle() {
    this.leaveGroup = !this.leaveGroup;
  }

  openModal(image: any) {
    this.pipupImage = image;
    document.getElementById('imgModal').style.display = "block";
  }

  closeModal() {
    document.getElementById('imgModal').style.display = "none";
  }

  getBranchdetails() {
    this.api.get('branchlist?classId=' + this.classId).subscribe((res: any) => {
      const branchData = res.branchData;
      branchData.forEach(element => {
        if (this.branchuserId === element._id) {
          this.branchName = element.branchName;
        }
      });
    });
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
      if (('|jpg|png|jpeg|gif|').indexOf(type) !== -1 && file.size <= 5e+6) {
        for (var i = 0; i < event.target.files.length; i++) {
          this.myFiles.push(event.target.files[i]);
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.image.push(event.target.result);
            if (this.image.length > 0) {
              this.imageBox = true;
            }
          };
          reader.readAsDataURL(event.target.files[i]);
        }
      } else if (file.size > 2e+6) {
        this.api.alert('File is larger than 5 MB', 'error');
      }
    } else {
      this.api.alert('File is Not Supported', 'error');
    }
  }

  deleteImage(i: any): void {
    this.index = i;
    (<HTMLInputElement>document.getElementById(`upLoader${i}`)).value = '';
    this.image.splice(i, 1);
    this.myFiles.splice(i, 1);
    this.imageBox = false;
  }

  submitChat(message: any) {
    let chat = new Chat();
    chat.message = message;
    chat.isClicked = false;
    chat.message_type = 0;
    chat.visibltyUser = true;
    chat.visibltyBusiness = true;
    chat.time = Date.now();
    this.time = chat.time
    chat.user_id = this.userId;
    chat.receiver_id = this.branchuserId;
    if (this.myFiles && this.myFiles.length > 0 && this.myFiles[0].name) {
      this.uploadAttachmenttoFirbase(chat).subscribe(percentage => {
        this.loading = true;
        if (percentage === 100) {
          this.loading = false;
        }
      }, error => {
        console.error('Error in uploading attachment...!');
      });
    } else {
      chat.image = '';
      if (message && message.trim() !== '') {
        this.sendMessageToFirebase(chat);
      }
    }
  }

  private sendMessageToFirebase(chat: Chat) {
    this.chatList.collection(this.collectionId).doc(this.time.toString())
      .set(Object.assign({}, chat)).then(res => {
        this.chatList.collection(this.collectionId).valueChanges().subscribe(snapshot => {
          this.allchatData = [];
          if (this.userType === 'business') {
            snapshot.forEach((data) => {
              if (data.visibltyBusiness) {
                this.allchatData.push(data);
                this.submitchat = '';
                this.myFiles = [];
                this.image = [];
                // (<HTMLInputElement>document.getElementById(`upLoader${this.index}`)).value = '';
                this.imageBox = false;
              }
            });
          } else {
            snapshot.forEach((data) => {
              if (data.visibltyUser) {
                this.allchatData.push(data);
                this.submitchat = '';
                this.myFiles = [];
                this.image = [];
                // (<HTMLInputElement>document.getElementById(`upLoader${this.index}`)).value = '';
                this.imageBox = false;
              }
            });
          }

        })
        this.updateChatHead(chat);
      });
  }

  private uploadAttachmenttoFirbase(chat: Chat): Observable<number> {
    const basePath = '/uploads';
    const filePath = `${basePath}/${this.myFiles[0].name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, this.myFiles[0]);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadUrl => {
          chat.image = downloadUrl;
          this.sendMessageToFirebase(chat);
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

  private updateChatHead(chat: Chat) {
    let chatHead = new ChatHead(chat);
    chatHead.receiver_id = this.branchuserId;
    chatHead.visibility = true;
    if (this.Data?.type === 'subbusiness') {
      chatHead.userName = this.Data?.branchName;
    } else {
      chatHead.userName = this.Data?.name;
    }
    // chatHead.userImage = this.Data?.image;
    this.chatHead.collection(this.userId).doc(this.branchuserId)
      .set(Object.assign({}, chatHead)).then(res => {
      }, error => {
        console.error('Error while updating chat of user - ' + error);
      });
    chatHead.receiver_id = this.userId;
    chatHead.user_id = this.branchuserId;
    chatHead.userName = this.userName;
    if (this.userimage) {
      // chatHead.userImage = this.userimage;
    }
    this.chatHead.collection(this.branchuserId).doc(this.userId)
      .set(Object.assign({}, chatHead)).then(res => {
      }, error => {
        console.error('Error while updating chat of branch - ' + error);
      });
  }

  isDifferentDay(messageIndex: number): boolean {
    if (messageIndex === 0) return true;

    const d1 = new Date(this.allchatData[messageIndex - 1].time);
    const d2 = new Date(this.allchatData[messageIndex].time);

    return (
      d1.getFullYear() !== d2.getFullYear() ||
      d1.getMonth() !== d2.getMonth() ||
      d1.getDate() !== d2.getDate()
    );
  }

  getMessageDate(messageIndex: number): string {
    let dateToday = new Date().toDateString();
    let longDateYesterday = new Date();
    longDateYesterday.setDate(new Date().getDate() - 1);
    let dateYesterday = longDateYesterday.toDateString();
    let today = dateToday.slice(0, dateToday.length - 5);
    let yesterday = dateYesterday.slice(0, dateToday.length - 5);

    const wholeDate = new Date(
      this.allchatData[messageIndex].time
    ).toDateString();

    this.messageDateString = wholeDate.slice(0, wholeDate.length - 5);

    if (
      new Date(this.allchatData[messageIndex].time).getFullYear() ===
      new Date().getFullYear()
    ) {
      if (this.messageDateString === today) {
        return "Today";
      } else if (this.messageDateString === yesterday) {
        return "Yesterday";
      } else {
        return this.messageDateString;
      }
    } else {
      return wholeDate;
    }
  }

  back() {
    this.location.back();
  }
}
