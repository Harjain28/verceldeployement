import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chat } from '../models/chat';

@Injectable({
  providedIn: "root",
})
export class ChatService {
  constructor(public firestore: AngularFirestore) { }

  addNewChat(senderId: any, receiverId: any) {
    return this.firestore.collection('chat_master').doc('message_list').set(senderId + '-' + receiverId);
  }

  addChat(chat: Chat, senderId: any, receiverId: any) {
    return this.firestore.collection('chat_master').doc('message_list')
      .collection(senderId + '-' + receiverId).add(chat);
  }

}
