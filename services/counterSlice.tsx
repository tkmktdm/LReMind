import { configureStore, createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;

// import { configureStore } from "@reduxjs/toolkit";
// // import userReducer from "./features/userSlice"; // ユーザー状態用スライス
// import { initialUserState } from "@/types/User";

// export const store = configureStore({
//   reducer: {
//     // user: userReducer, // スライスを登録
//     user: initialUserState, // スライスを登録
//   },
// });

// // RootStateとAppDispatchの型をエクスポート
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;
