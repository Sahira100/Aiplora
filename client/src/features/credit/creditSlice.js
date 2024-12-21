import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../utils";

const initialState = {
  credits: [],
  isLoading: false,
};

export const getCredits = createAsyncThunk(
  "credit/getCredits",
  async (thunkAPI) => {
    try {
      const resp = await customFetch.get("/credits");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const creditSlice = createSlice({
  name: "credit",
  initialState,
  reducers: {
    removeCredits: (state, action) => {
      const usedPackages = action.payload;
      usedPackages.forEach(({ creditId, amount }) => {
        const creditIndex = state.credits.findIndex(
          (credit) => credit._id === creditId
        );

        if (creditIndex !== -1) {
          state.credits[creditIndex].remainingCredits -= amount;
          if (state.credits[creditIndex].remainingCredits <= 0) {
            state.credits[creditIndex].remainingCredits = 0;
          }
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCredits.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCredits.fulfilled, (state, action) => {
        const { credits } = action.payload.data;
        state.isLoading = false;
        state.credits = credits;
      })
      .addCase(getCredits.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});

export const {
  createChat,
  setPendingStatus,
  addMessage,
  setLoadingStatus,
  setError,
  changeBot,
  removeCredits,
} = creditSlice.actions;

export default creditSlice.reducer;
