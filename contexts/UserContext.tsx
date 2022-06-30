import React, { createContext, useContext } from "react";
import { useSession } from "next-auth/react";
import { useGetUserQuery, GetUserQuery } from "../graphql/generated/types";

interface UserContextProps {
  user: GetUserQuery["user"];
}

interface UserContextProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextProps>({ user: null });

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const { data: sessionData } = useSession();
  const { data } = useGetUserQuery({
    variables: { input: { name: sessionData?.user?.name!, email: sessionData?.user?.email! } },
  });

  return <UserContext.Provider value={{ user: data?.user }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
