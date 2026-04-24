import { useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { AUTH_STORAGE } from "../../constants";

export const AuthProvider = ({ children }) => {
  const isLogin = JSON.parse(localStorage.getItem(AUTH_STORAGE) || false);
  const [isAuth, setIsAuth] = useState(isLogin); // залогинен или не залогинен пользователь

  return <AuthContext.Provider value={{ isAuth, setIsAuth }}>{children}</AuthContext.Provider>;
};
