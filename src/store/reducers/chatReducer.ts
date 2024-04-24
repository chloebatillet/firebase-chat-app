import { createSlice } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";

interface Message {
  text: string;
  senderID: string;
  messageID: string;
  createdAt: Timestamp;
}

interface ChatState {
  chatID: string;
  name?: string;
  receiverID: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  messages: Message[];
}

export const initialState: ChatState = {
  chatID: "",
  receiverID: "",
  messages: [],
};

const chatReducer = createSlice({
  name: "chatReducer",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export default chatReducer.reducer;
