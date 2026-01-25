import axios, { AxiosRequestConfig } from "axios";
import { NextRequest } from "next/server";

export async function apiPost(
  request: NextRequest,
  url: string,
  config?: AxiosRequestConfig
) {
  // body を正しい形で取得
  const body = await request.json();

  // headers を axios 用に変換
  const headers = Object.fromEntries(request.headers.entries());

  console.log("apiProxy");
  console.log(body);
  console.log(url);

  return axios.post(url, body, {
    ...config,
    headers: {
      ...headers,
      ...config?.headers,
    },
    withCredentials: true,
  });
}
