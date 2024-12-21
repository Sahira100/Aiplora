import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../utils";
import { setGlobalLoading } from "../task/taskSlice";

const initialState = {
  id: null,
  bot: null,
  temp: null,
  error: null,
  selectMessages: [],
  deleteScreen: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.id = action.payload.id;
      state.bot = action.payload.bot;
      state.selectMessages = [];
      state.deleteScreen = false;
    },
    setTemp: (state, action) => {
      state.temp = action.payload;
    },
    changeBot: (state, action) => {
      state.bot = action.payload;
    },

    clearTemp: (state, action) => {
      state.temp = null;
    },
    addMessage: (state, action) => {
      const messageIndex = action.payload;
      state.selectMessages.push(messageIndex);
      state.deleteScreen = true;
    },
    activeDeleteScreen: (state, action) => {
      state.deleteScreen = action.payload;
    },
    removeMessage: (state, action) => {
      const messageIndex = action.payload;

      state.selectMessages = state.selectMessages.filter(
        (mIndex) => mIndex !== messageIndex
      );
    },
    clearMessages: (state, action) => {
      state.selectMessages = [];
      state.deleteScreen = false;
    },
  },
});

export const {
  setChat,
  changeBot,
  setTemp,
  clearTemp,
  addMessage,
  activeDeleteScreen,
  removeMessage,
  clearMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
