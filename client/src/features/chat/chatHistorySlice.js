import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllChat, getChat } from "../../api";

const initialState = {
  history: [],
  hasNextPage: false,
  isLoading: false,
  error: null,
};

export const fetchChatHistory = createAsyncThunk(
  "chat/fetchChatHistory",
  async (page, thunkAPI) => {
    try {
      const resp = await getAllChat({ page });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchChatHistoryById = createAsyncThunk(
  "chat/fetchChatHistoryById",
  async (id) => {
    try {
      const resp = await getChat(id);
      return resp.data;
    } catch (error) {
      //
    }
  }
);

const chatHistorySlice = createSlice({
  name: "chatHistory",
  initialState,
  reducers: {
    clearHistory: (state) => {
      state.history = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        const chats = action.payload.data.chats;
        state.hasNextPage = action.payload.meta.hasNextPage;

        state.isLoading = false;
        state.history = [...state.history, ...chats];
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to load chat history";
      })
      .addCase(fetchChatHistoryById.fulfilled, (state, action) => {
        const { chat } = action.payload.data;
        state.history = [chat, ...state.history];
      });
  },
});

export const { addChatToHistory, clearHistory } = chatHistorySlice.reducer;

export default chatHistorySlice.reducer;
