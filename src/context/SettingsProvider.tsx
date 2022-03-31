import React, { useState, createContext, useEffect } from "react";

interface SettingsProvider {
  on: boolean;
  setOn: (data: boolean) => void;
  principleValues: number[];
  setPrincipalValues: (data: number[]) => void;
}

export const SettingsContext = createContext<Partial<SettingsProvider>>({});
// export const SettingsContext = createContext({} as SettingsProvider);

export const SettingsProvider = (props: any) => {
  const [on, setOn] = useState(false);
  const [principleValues, setPrincipalValues] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  return (
    <SettingsContext.Provider
      children={props.children}
      value={{
        on,
        setOn,
        principleValues,
        setPrincipalValues,
      }}
    />
  );
};
