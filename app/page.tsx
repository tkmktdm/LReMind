"use server";

import { cookies } from "next/headers";
import PageClient from "./PageClient";

export default async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return <PageClient user={null} categoryData={[]} taskData={[]} />;
  }

  // 並列取得
  const [userRes, categoryRes, taskRes] = await Promise.all([
    fetch(`${process.env.LR_BACKEND_API}/api/setting/user`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),
    fetch(`${process.env.LR_BACKEND_API}/api/categories`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),
    fetch(`${process.env.LR_BACKEND_API}/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),
  ]);

  const user = await userRes.json();
  const categories = await categoryRes.json();
  const tasks = await taskRes.json();

  return (
    <PageClient
      user={user}
      categoryData={categories}
      taskData={tasks}
      token={token}
    />
  );
}
