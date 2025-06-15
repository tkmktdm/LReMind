import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      console.log("state");
      console.log(state);
      console.log("action");
      console.log(action);
      state.user = action.payload; // action.payloadはUser型
    },
    signOut: () => initialState,
  },
});

export default userSlice.reducer;
export const { setUser, signOut } = userSlice.actions;
