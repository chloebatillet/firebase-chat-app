import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { messagesRef, auth, db } from "../../firebase-config";
import { formatDate } from "../../hooks/formatDate";
import { Message } from "../../@types";

interface ChatState {
  chatID?: string;
  createdAt: string;
  messages: Message[];
}

export const initialState: ChatState = {
  createdAt: "",
  messages: [],
};

export const selectChat = createAsyncThunk(
  "chat/select-chat",
  async (chatID: string) => {
    try {
      const docRef = doc(db, "chats", chatID);
      const docSnap = await getDoc(docRef);
      const messageList: Message[] = [];

      if (docSnap.exists()) {
        const q = query(
          collection(docRef, "messages"),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          messageList.push({
            ...doc.data(),
          } as Message);
        });
      }

      return { chatID, createdAt: docSnap.data()?.createdAt, messages: messageList };
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response.data.error);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/send-message",
  async (textMessage: string) => {
    try {
      await addDoc(messagesRef, {
        text: textMessage.trim(),
        date: serverTimestamp(),
        user_uid: auth.currentUser?.uid,
      });

      return;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response.data.error);
    }
  }
);

const chatReducer = createSlice({
  name: "chatReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(selectChat.fulfilled, (state, action) => {
      state.chatID = action.payload.chatID;
      state.messages = action.payload?.messages;
      state.createdAt = formatDate(action.payload?.createdAt);
    });
  },
});

export default chatReducer.reducer;
