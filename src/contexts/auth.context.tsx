import React, { useEffect, useState, createContext, ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { FormDataProps } from "ts/types/register";
import TodosService from "services/todos.services";

import validateLogin from "utils/validateLogin";

interface IAuthProvider {
  children: ReactNode;
}

interface IUser extends FormDataProps {
  id: string;
}

type ITodoContext = [
  authState: FormDataProps,
  setAuthState: React.Dispatch<React.SetStateAction<IUser>>,
  handleLogin: any
];

const defaultUser: IUser = {
  id: "",
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

export const AuthContext = createContext<ITodoContext>([
  defaultUser,
  () => {},
  () => {},
]);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [authState, setAuthState] = useState<IUser>(defaultUser);
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      setAuthState(JSON.parse(localStorageUser));
    }
    setLoading(false);
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const todoFetch = await TodosService.get(authState.id);
      setAuthState(todoFetch.data);
    } catch (error) {
      history.push("/login");
    }
  };

  const handleLogin = async (formData: FormDataProps) => {
    try {
      console.log("Login");
      setAuthState((prevState) => {
        const newAuthState = { ...prevState, id: "1", name: "Leonardo" };
        // Important that we need the updated authState, so we can't wait after render
        // that is why it is important to setState inside callback
        localStorage.setItem("user", JSON.stringify(newAuthState));
        return newAuthState;
      });
    } catch (err: any) {
      err.errors = [err.message];
      throw err;
    }
  };

  const handleLogout = async () => {
    console.log("Logout");
    console.log(history);

    try {
      localStorage.removeItem("user");
      setAuthState(defaultUser);
      history.push("/login");
    } catch (err: any) {
      console.log(err);
      //err.errors = [err.message];
      //throw err;
    }
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <AuthContext.Provider value={[authState, fetchCurrentUser, handleLogin]}>
      {children}
    </AuthContext.Provider>
  );
};
