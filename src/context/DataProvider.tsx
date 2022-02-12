import React, { useState, createContext, useEffect } from "react";

interface StatusContextProps {
  statusMessage: string;
  statusColor: string;
  statusTexColor: string;
}

export const DataContext = createContext<StatusContextProps | null>(null);

export const DataProvider = (props: any) => {
  const [statusMessage, setStatusMessage] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const [statusTexColor, setStatusTextColor] = useState("");

  return (
    <DataContext.Provider
      children={props.children}
      value={{
        statusMessage,
        statusColor,
        statusTexColor,
      }}
    />
  );
};
