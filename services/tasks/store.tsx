import { configureStore } from "@reduxjs/toolkit";
// import { userReducer } from "@/services/users/userSlice";
import { setUser, userSlice } from "@/services/users/userSlice";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

// export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
// const dispatch = useAppDispatch();
// const userData = "test";
// dispatch(setUser({ name: userData }));

export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;
