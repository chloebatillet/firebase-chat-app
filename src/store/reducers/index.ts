import chatReducer from "./chatReducer";
import userReducer from "./userReducer";

const reducer = {
  user: userReducer,
  chat: chatReducer
};

export default reducer;
