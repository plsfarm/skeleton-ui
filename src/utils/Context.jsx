import React, { createContext, useState } from "react";
import { usePublicClient, useWalletClient } from "wagmi";

export const Context = createContext();

export default function ContextProvider({ children }) {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [data, setData] = useState({

  });
  const updateData = () => {

  };
  return (
    <Context.Provider value={{ data, updateData }}>{children}</Context.Provider>
  );
}
//
