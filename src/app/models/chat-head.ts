import { Chat } from "./chat";

export class ChatHead {
    image: any;
    isClicked: boolean;
    message: any;
    message_type: any;
    time: any;
    user_id: any;
    receiver_id: any;
    type: any;
    userName: any;
    visibility: boolean;
    // userImage: any;

    constructor(chat: Chat) {
        this.image = chat.image;
        this.isClicked = chat.isClicked;
        this.message = chat.message;
        this.message_type = chat.message_type;
        this.time = chat.time;
        this.user_id = chat.user_id;
        this.receiver_id = chat.receiver_id;
    }
}
