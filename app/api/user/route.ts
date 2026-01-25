"use server";

import { NextResponse } from "next/server";

export async function GET(token: String): Promise<any> {
  try {
    const res = await fetch(`${process.env.LR_BACKEND_API}/api/setting/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store", // ←重要
    });
    if (!res.ok) {
      return NextResponse.json(
        { message: "failed to fetch user" },
        { status: res.status }
      );
    }
    const user = await res.json();
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
