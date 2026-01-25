// // lib/auth.ts
// import jwt from "jsonwebtoken";
// import { prisma } from "@/lib/prisma";

// type JwtPayload = {
//   userId: string;
// };

// export async function fetchUserBySession(token: string) {
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

//     // userId で DB 取得
//     const user = await prisma.user.findUnique({
//       where: { id: decoded.userId },
//     });

//     return user;
//   } catch {
//     return null;
//   }
// }

// // lib/auth.ts
// import { prisma } from "@/lib/prisma";

// export async function fetchUserBySession(sessionToken: string) {
//   // ① セッションを探す
//   const session = await prisma.session.findUnique({
//     where: { sessionToken },
//     include: { user: true },
//   });

//   // ② なければ未ログイン
//   if (!session) return null;

//   // ③ 有効期限チェック（重要！）
//   if (session.expiresAt < new Date()) {
//     return null;
//   }

//   // ④ user を返す
//   return session.user;
// }
