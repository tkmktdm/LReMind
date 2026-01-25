import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const token = cookies().get("token")?.value ?? null;
  console.log("token------");
  console.log(token);
  if (token) {
    const res = await fetch(`${process.env.LR_BACKEND_API}/api/logout`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });
    if (res.ok) {
      cookies().delete("token");
      cookies().delete("user");
      cookies().delete("auth_token"); // Laravel 側のやつもあれば
      return NextResponse.json({ ok: true });
    }
  }
  return NextResponse.json({ ok: false });
}
