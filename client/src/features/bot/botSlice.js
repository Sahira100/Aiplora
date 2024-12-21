import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../utils";

const initialState = {
  bots: null,
  selectBot: null,
  isLoading: false,
  error: null,
};

export const getBots = createAsyncThunk(
  "bot/getBots",
  async (page, thunkAPI) => {
    try {
      const resp = await customFetch.get(`/bot?page=${page}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const botSlice = createSlice({
  name: "bot",
  initialState,
  reducers: {
    setSelectBot: (state, action) => {
      const bot = action.payload;
      state.selectBot = bot;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBots.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBots.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.bots = data.bots;
        state.selectBot = data.bots[0];
        state.isLoading = false;
        state.login = true;
        //state.credits = action.payload;
      })
      .addCase(getBots.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectBot } = botSlice.actions;

export default botSlice.reducer;
