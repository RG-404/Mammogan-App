import React, { useState, createContext, useEffect } from "react";

interface StatusContextProps {
  statusMessage: string;
  statusColor: string;
  statusTexColor: string;
}

export const StatusContext = createContext<StatusContextProps | null>(null);

export const StatusProvider = (props: any) => {
  const [statusMessage, setStatusMessage] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const [statusTexColor, setStatusTextColor] = useState("");

  return (
    <StatusContext.Provider
      children={props.children}
      value={{
        statusMessage,
        statusColor,
        statusTexColor,
      }}
    />
  );
};
