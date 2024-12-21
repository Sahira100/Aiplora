import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setGlobalLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setGlobalLoading } = taskSlice.actions;
export default taskSlice.reducer;
