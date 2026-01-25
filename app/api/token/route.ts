"use server";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(text: String): Promise<any> {
  console.log("GET----- route.token");
  try {
    const cookieStore = cookies();
    const token = await cookieStore.get("token")?.value;
    if (token) return NextResponse.json({ token });
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({});
  }
}
