"use server";

import Redis from "ioredis";

import { signActionServer } from "@/services/signActionServices";
import { cookies } from "next/headers";

export async function getUser() {
  const redis = new Redis();
  console.log("redis---------");
  console.log(await redis.keys("*"));
  const signAction = new signActionServer();
  const response = await signAction.postLogin({
    email: "test@example.com",
    password: "password",
  });

  // const cookieStore = cookies();
  // await cookieStore.set({
  //   name: "token",
  //   value: response.data.token,
  //   path: "/",
  //   httpOnly: true,
  //   // secure: true,
  //   sameSite: "lax",
  // });
  // console.log("response");
  // console.log(response);
  //   return null;
  // if (response) {
  //   await redis.set(`user:${sessionId}`, JSON.stringify(user), "EX", 3600); // キャッシュ1時間
  // }

  return response.data.user;
  //   return { id: 1, name: "Test User" }; // 実際はDB接続などサーバー側処理を書く
}
