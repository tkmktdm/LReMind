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

// protected $casts = [
//     'title' => "string",
//     'notes' => "string",
//     'status' => "integer",
//     'score' => "integer",
//     'sort_order' => "integer",
//     'priority' => "integer",
//     'start_date' => "datetime",
//     'end_date' => "datetime",
//     'target_date' => "datetime",
//     'user_id' => "integer",
//     'category_id' => "integer",
// ];

export type Task = {
  id: string;
  title: string;
  notes?: string;
  status?: number;
  score?: number;
  sort_order?: number;
  priority?: number;
  start_date?: Date;
  end_date?: Date;
  target_date?: Date;
  user_id?: number;
  category_id?: number;
  // title: string;
} | null;
