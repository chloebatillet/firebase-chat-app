import { Timestamp } from "firebase/firestore";

export interface User {
  display_name: string;
  photo_url: string;
  uid: string;
}


interface Message {
  text: string;
  senderID: string;
  messageID: string;
  createdAt: any;
}

export interface Userchat {
  chatID: string,
  name?: string,
  receiverID: string,
  updatedAt: Timestamp
}