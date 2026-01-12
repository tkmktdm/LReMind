"use server";

import { NextRequest, NextResponse } from "next/server";
import Redis from "ioredis";
import { signActionServer } from "@/services/signActionServices";
import { cookies } from "next/headers";

export async function GET(request: NextRequest): Promise<any> {
  const redis = new Redis();
  try {
    // redisのキャッシュから取得する
    const cookieStore = cookies();
    // console.log("getAll");
    // console.log(cookieStore.getAll());
    const auth_token = await cookieStore.get("auth_token")?.value;
    // console.log("auth_token");
    // console.log(auth_token);

    if (auth_token) {
      const user = await redis.get(auth_token);
      console.log(`User from Redis: ${user}\n`);
      return NextResponse.json(user);
    }
    return null;
    // // cookieにアクセストークンがない場合
    // const signAction = new signActionServer();
    // // Laravelへのリクエスト
    // const response = await signAction.postLogin({
    //   email: "test@example.com",
    //   password: "password",
    // });
    // if (response.status !== 200 && !response && !response.data.user) {
    //   throw new Error(`Login request failed with status: ${response.status}`);
    // }
    // return NextResponse.json(response.data.user);
    // // const res = NextResponse.json(response.data.user);
    // // const res = JSON.stringify(response.data.user);
    // // return res;
  } catch (error) {
    console.error("Error occurred:", error);
    return null;

    // return NextResponse.json(
    //   { error: "Internal Server Error" },
    //   { status: 500 }
    // );
  } finally {
    redis.quit();
  }
}
export async function POST(request: NextRequest): Promise<any> {
  const redis = new Redis();
  try {
    // redisのキャッシュから取得する
    const cookieStore = cookies();
    // console.log("getAll");
    // console.log(cookieStore.getAll());
    const auth_token = await cookieStore.get("auth_token")?.value;
    // console.log("auth_token");
    // console.log(auth_token);

    if (auth_token) {
      const user = await redis.get(auth_token);
      //   console.log(`User from Redis: ${user}\n`);
      return NextResponse.json(user);
    }
    return null;
    // // cookieにアクセストークンがない場合
    // const signAction = new signActionServer();
    // // Laravelへのリクエスト
    // const response = await signAction.postLogin({
    //   email: "test@example.com",
    //   password: "password",
    // });
    // if (response.status !== 200 && !response && !response.data.user) {
    //   throw new Error(`Login request failed with status: ${response.status}`);
    // }
    // return NextResponse.json(response.data.user);
    // // const res = NextResponse.json(response.data.user);
    // // const res = JSON.stringify(response.data.user);
    // // return res;
  } catch (error) {
    console.error("Error occurred:", error);
    return null;

    // return NextResponse.json(
    //   { error: "Internal Server Error" },
    //   { status: 500 }
    // );
  } finally {
    redis.quit();
  }
}
