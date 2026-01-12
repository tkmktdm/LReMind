"use client";
import { createContext, useContext } from "react";

export type User = {
  id: number;
  name: string;
  //   email: string;
  token: string;
} | null;

const UserContext = createContext<User>(null);

export const UserProvider = ({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
