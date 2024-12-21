import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../utils";

const initialState = {
  name: "",
  bot: null,
  login: false,
  isLoading: false,
  error: null,
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async (name, thunkAPI) => {
    try {
      const resp = await customFetch.get("/users/showme");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.name = data.user.name;
        state.isLoading = false;
        state.login = true;
        //state.credits = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

// export const { setBot } = userSlice.actions;

export default userSlice.reducer;
