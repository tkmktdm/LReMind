"use server";

import { NextRequest, NextResponse } from "next/server";
import Redis from "ioredis";
import { signActionServer } from "@/services/signActionServices";
import { cookies } from "next/headers";

export async function GET(text: String): Promise<any> {
  const redis = new Redis();
  console.log("GET----- route.user");
  try {
    // redisのキャッシュから取得する
    console.log("1-----");
    const cookieStore = cookies();
    console.log("2-----");
    const token = await cookieStore.get("token")?.value;
    const authToken = await cookieStore.get("authToken")?.value;
    console.log("3-----");
    console.log(cookieStore.getAll());
    console.log(token);
    console.log(authToken);

    if (!token) {
      console.log("4-----");

      // const user = await redis.get(auth_token);
      //   console.log(`User from Redis: ${user}\n`);
      console.log("5-----");
      return NextResponse.json({});
    }
    console.log("6-----");
    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error occurred:", error);
    return null;
  } finally {
    redis.quit();
  }
}
