// interface UserState {
//   name: string;
//   //   kana: string;
//   // phone: string,
//   // email: string,
//   // gender: string,
// }

// export const initialUserState: UserState = {
//   name: "",
//   //   kana: "",
// };

// export type User = {
//   name: string;
//   // email: string;
//   // password: string;
// };

// export type UserState = {
//   user: User;
// };

// export const initialState: UserState = {
//   user: {
//     name: "",
//     // email: "",
//   },
// };

// User.ts
export type User = {
  id: number;
  name: string;
} | null;
