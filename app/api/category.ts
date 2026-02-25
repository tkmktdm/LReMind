"use server";

import Redis from "ioredis";
import { cookies } from "next/headers";
import { Category } from "@/types/Category";

export async function setToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  return token;
}

export async function getCategories(token: string) {
  const url = `${process.env.LR_BACKEND_API}`;
  const res = await fetch(`${url}/api/categories`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    console.log("カテゴリーが存在しません。");
  }
  if (res && res.ok) return res.json();
  return null;
}

/**
 * 並べ替え処理
 * @param id
 * @returns
 */
export async function sortCategories(id: string) {
  const token = await setToken();
  const url = `${process.env.LR_BACKEND_API}`;
  const res = await fetch(`${url}/api/categories/${id}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  if (res && res.ok) return await res.json();
  if (!res.ok) console.error("カテゴリーの並び替えに失敗しました");
  return new Response("Request body failed category update", { status: 400 });
}

export async function storeCategories(data: Category) {
  console.log("data-------");
  console.log(data);
  const token = await setToken();
  const url = `${process.env.LR_BACKEND_API}`;
  const res = await fetch(`${url}/api/categories`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: data.name,
      user_id: data.user_id,
    }),
  });
  if (res && res.ok) return res.json();
  if (!res.ok) console.error("カテゴリーの作成に失敗しました");
  return null;
}

export async function updateCategories(data: Category) {
  console.log("data-------");
  console.log(data);
  const token = await setToken();
  const url = `${process.env.LR_BACKEND_API}`;
  const res = await fetch(`${url}/api/categories/${data.id}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: data.id,
      name: data.name,
      user_id: data.user_id,
    }),
  });
  if (res && res.ok) return res.json();
  if (!res.ok) console.error("カテゴリーの更新に失敗しました");
  console.error(res);
  return null;
}

export async function deleteCategories(id: string) {
  console.log("id-------");
  console.log(id);
  const token = await setToken();
  const url = `${process.env.LR_BACKEND_API}`;
  const res = await fetch(`${url}/api/categories/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res && res.ok) return res.json();
  if (!res.ok) console.error("カテゴリーの削除に失敗しました");
  return null;
}
