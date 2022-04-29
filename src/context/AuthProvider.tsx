import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

import CONFIG from "../config.json";

interface loginRequestBody {
  userid: string;
  password: string;
}

interface AuthContextType {
  sessionToken: string;
  currentUserType: string;
  userTypes: Object;
  setSessionToken: (data: string) => void;
  login: (data: loginRequestBody) => Promise<boolean>;
}

interface userTypeInterface {
  Generaluser: string;
  Admin: string;
}

export const AuthContext = createContext<Partial<AuthContextType>>({});

export const AuthProvider: React.FC<React.ReactNode> = (props: any) => {
  const [sessionToken, setSessionToken] = useState<string>("");
  const [currentUserType, setCurrentUserType] = useState<string>("");
  const [userTypes, setUserTypes] = useState<userTypeInterface>({
    Generaluser: "",
    Admin: "",
  });

  useEffect(() => {
    getUserTypes();
  }, []);

  const getUserTypes = async () => {
    const res = await axios.get(`${CONFIG.management_api}/auth/user/types`);
    console.log(res.data);
    setUserTypes(res.data);
  };

  const login = async (data: loginRequestBody): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${CONFIG.management_api}/auth/user/signin`,
          {
            userid: data.userid,
            password: data.password,
          }
        );
        setSessionToken(res.data.session_token);
        setCurrentUserType(res.data.userType);
        console.log("SUCCESS");
        resolve(true);
      } catch (error) {
        console.log("FAILED");
        resolve(false);
      }
    });
  };

  return (
    <AuthContext.Provider
      children={props.children}
      value={{
        sessionToken,
        currentUserType,
        userTypes,
        setSessionToken,
        login,
      }}
    />
  );
};
