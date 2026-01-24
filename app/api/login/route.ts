import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const res = await fetch(`${process.env.LR_BACKEND_API}/api/login`, {
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
        { message: "login failed" },
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
    // 必要なら cookie を Next.js 側で管理
    // console.log("routeAccessToken");
    // const cookieStore = cookies();
    // await cookieStore.set({
    //   name: "user",
    //   value: data.user,
    //   path: "/",
    //   httpOnly: true,
    //   sameSite: "lax",
    // });
    // await cookieStore.set({
    //   name: "token",
    //   value: data.token,
    //   path: "/",
    //   httpOnly: true,
    //   sameSite: "lax",
    // });

    return response;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
