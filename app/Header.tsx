"use client";

import Link from "next/link";

type Props = {
  user: { name: string } | null;
};

export default function Header({ user }: Props) {
  return (
    <header className="w-full h-[6vh] fixed top-0 bg-gray-100 text-black flex items-center px-4 z-[1000]">
      {/* 左側のメニュー */}
      <nav className="flex space-x-4">
        <Link href="/" className="hover:underline">
          LR
        </Link>
        <Link href="/articles" className="hover:underline">
          Article
        </Link>
        <Link href="/events" className="hover:underline">
          Event
        </Link>
        {/* <Link href="/brothers" className="hover:underline">
          Brother
        </Link> */}
      </nav>

      {/* 右側のユーザー or 認証ボタン */}
      <div className="ml-auto flex items-center space-x-4">
        {user ? (
          <div className="relative group">
            <button className="flex items-center space-x-2 bg-white border px-3 py-1 rounded-md shadow-sm hover:bg-gray-50">
              <span>{user.name}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg hidden group-hover:block">
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                プロフィール
              </Link>
              <Link
                href="/logout"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                ログアウト
              </Link>
            </div>
          </div>
        ) : (
          <>
            <Link href="/register" className="hover:underline">
              Sign up
            </Link>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
