import React, { useState, createContext, ReactNode } from "react";
import { FormDataProps } from "ts/types/register";

interface IAuthProvider {
  children: ReactNode;
}

type ITodoContext = [
  authState: FormDataProps,
  setAuthState: React.Dispatch<React.SetStateAction<FormDataProps>>
];

const defaultUser: FormDataProps = {
  name: "",
  username: "",
  email: "",
  password: "",
  birth_date: new Date(),
  profilePic: new File([""], ""),
  otherComments: "",
  usePurpose: "Personal",
  otherProducts: [],
};

export const AuthContext = createContext<ITodoContext>([defaultUser, () => {}]);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [authState, setAuthState] = useState<FormDataProps>(defaultUser);

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {children}
    </AuthContext.Provider>
  );
};
