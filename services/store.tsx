import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/services/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

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
