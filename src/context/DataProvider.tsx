import React, { useState, createContext, useEffect } from "react";

interface StatusContextProps {
  realImageSrc: string,
  setRealImageSrc: (data:string) => void,
  genImageSrc: string,
  setGenImageSrc: (data:string) => void,
  fileName: string,
  setFileName: (data:string) => void
}

export const DataContext = createContext<Partial<StatusContextProps>>({});

export const DataProvider = (props: any) => {

  const [realImageSrc, setRealImageSrc] = useState<string>("");
  const [genImageSrc, setGenImageSrc] = useState<string>("");
  const [fileName, setFileName] = useState<string>('');



  return (
    <DataContext.Provider
      children={props.children}
      value={{
        realImageSrc,
        setRealImageSrc,
        genImageSrc,
        setGenImageSrc,
        fileName,
        setFileName
      }}
    />
  );
};
