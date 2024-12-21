import { configureStore } from "@reduxjs/toolkit";

import chatReducer from "./features/chat/chatSlice";
import taskReducer from "./features/task/taskSlice";
import botReducer from "./features/bot/botSlice";
import creditReducer from "./features/credit/creditSlice";
import userReducer from "./features/user/userSlice";
import chatHistoryReducer from "./features/chat/chatHistorySlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    chatHistory: chatHistoryReducer,
    task: taskReducer,
    bot: botReducer,
    credit: creditReducer,
    user: userReducer,
  },
});
