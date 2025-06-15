// import React, { createContext, useState, useContext } from "react";

// // UserContextを作成
// const UserContext = createContext();

// // UserProviderコンポーネントを定義
// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // ユーザー情報の状態

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Contextを利用するカスタムフック
// export const useUser = () => useContext(UserContext);
