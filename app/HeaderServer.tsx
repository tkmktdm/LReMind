import { cookies } from "next/headers";
import HeaderClient from "./Header";

export default async function HeaderServer() {
  const token = cookies().get("token")?.value ?? null;
  console.log("token------");
  console.log(token);
  let user = null;
  if (token) {
    const res = await fetch(`${process.env.LR_BACKEND_API}/api/setting/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (res.ok) {
      user = await res.json();
    }
  }

  return <HeaderClient user={user} />;
}
