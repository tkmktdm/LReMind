import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch(`${process.env.LR_BACKEND_API}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log("routePost");
    console.log(res);
    if (!res.ok) {
      return NextResponse.json(
        { message: "register failed" },
        { status: res.status }
      );
    }
    const data = await res.json();
    console.log("routePostData");
    console.log(data);

    // return data;
    const response = NextResponse.json(data);
    response.cookies.set("token", data.token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
    return response;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
