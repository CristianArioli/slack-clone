import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    roomId: null,
    roomAdmin: null,
  },
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
      state.roomAdmin = action.payload.roomAdmin;
    },
  },
});

export const { enterRoom } = appSlice.actions;

export const selectRoomId = (state) => state.app.roomId;

export const selectRoomAdmin = (state) => state.app.roomAdmin;

export default appSlice.reducer;
