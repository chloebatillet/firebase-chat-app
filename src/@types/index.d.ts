export interface User {
  display_name: string;
  photo_url: string;
  uid: string;
}


export interface Message {
  id: string;
  text: string;
  date: any;
  user_uid: string | null;
}