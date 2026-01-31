"use server";

import Redis from "ioredis";
import { signActionServer } from "@/services/signActionServices";
import { cookies } from "next/headers";
import { User } from "@/types/User";
import { Task } from "@/components/TaskCardBase";

// // タスク取得
// export async function fetchTasks(token: string) {
//   const res = await fetch(`${API_URL}/api/tasks`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch tasks");
//   }

//   return res.json();
// }
export async function setToken() {
  // axios.defaults.withCredentials = true;
  // axios.defaults.xsrfCookieName = "XSRF-TOKEN";
  // axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN";

  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  // const token = "N5q2I9ces6GDopm12ODLVHoHCygb8tNfhgHeKjVA7df2e86e";
  return token;
}

// export async function setUp() {
//   const redis = new Redis();
//   console.log("redis---------");
//   console.log(await redis.keys("*"));
//   const signAction = new signActionServer();
//   const response = await signAction.postLogin({
//     email: "test@example.com",
//     password: "password",
//   });
//   const cookieStore = cookies();
//   await cookieStore.set({
//     name: "token",
//     value: response.data.token,
//     path: "/",
//     httpOnly: true,
//     // secure: true,
//     sameSite: "lax",
//   });
//   return response.data.user;
// }

export async function getTasks(token: string) {
  // const user = await setUp();
  // if (!user) return;
  // const id = user.id;
  // const token = user.auth_token;

  // const url = `${process.env.NEXT_PUBLIC_LR_BACKEND_API}`;
  // const token = await setToken();
  const url = `${process.env.LR_BACKEND_API}`;
  const res = await fetch(`${url}/api/tasks`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    console.log("タスクが存在しません。");
  }
  if (res && res.ok) return res.json();
  return null;
  //   return { id: 1, name: "Test User" }; // 実際はDB接続などサーバー側処理を書く
}

/**
 * 並べ替え処理
 * @param id
 * @returns
 */
export async function sortTasks(id: string) {
  const token = await setToken();
  const url = `${process.env.LR_BACKEND_API}`;
  const res = await fetch(`${url}/api/tasks/${id}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  if (res && res.ok) return await res.json();
  if (!res.ok) console.error("タスクの更新に失敗しました");
  return new Response("Request body already used", { status: 400 });
  //   return { id: 1, name: "Test User" }; // 実際はDB接続などサーバー側処理を書く
}

export async function storeTasks(data: Task) {
  console.log("data-------");
  console.log(data);
  const token = setToken();
  const url = `${process.env.LR_BACKEND_API}`;
  const res = await fetch(`${url}/api/tasks`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: data.title,
      notes: data.notes,
      user_id: data.user_id,
      isComplete: false,
    }),
  });
  if (res && res.ok) return res.json();
  if (!res.ok) console.error("タスクの更新に失敗しました");
  return null;
}

export async function updateTasks(data: Task) {
  console.log("data-------");
  console.log(data);
  const token = setToken();
  const url = `${process.env.LR_BACKEND_API}`;
  const res = await fetch(`${url}/api/tasks/${data.id}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: data.id,
      title: data.title,
      notes: data.notes,
    }),
  });
  if (res && res.ok) return res.json();
  if (!res.ok) console.error("タスクの更新に失敗しました");
  console.error(res);
  return null;
}

export async function deleteTasks(id: string) {
  console.log("id-------");
  console.log(id);
  const token = await setToken();
  const url = `${process.env.LR_BACKEND_API}`;
  const res = await fetch(`${url}/api/tasks/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res && res.ok) return res.json();
  if (!res.ok) console.error("タスクの更新に失敗しました");
  return null;
}
