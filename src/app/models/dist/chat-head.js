"use strict";
exports.__esModule = true;
exports.ChatHead = void 0;
var ChatHead = /** @class */ (function () {
    function ChatHead(chat) {
        this.image = chat.image;
        this.isClicked = chat.isClicked;
        this.message = chat.message;
        this.message_type = chat.message_type;
        this.time = chat.time;
        this.user_id = chat.user_id;
        this.receiver_id = chat.receiver_id;
    }
    return ChatHead;
}());
exports.ChatHead = ChatHead;
