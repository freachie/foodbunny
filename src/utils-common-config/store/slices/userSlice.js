import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: '',
    phone: null,
    email: '',
    isUserLoggedIn: false
  },
  reducers: {
    updateUserDetails: (state, action) => {
      state.name = action.payload?.name;
      state.phone = action.payload?.phone;
      state.email = action.payload?.email;
      state.isUserLoggedIn = action.payload?.isUserLoggedIn ?? false;
    }
  }
});

export const { updateUserDetails } = userSlice.actions;

export default userSlice.reducer;