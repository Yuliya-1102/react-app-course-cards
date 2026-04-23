import { Button } from "../Button";
import cls from "./Header.module.css";

import ReactLogo from "../../assets/react.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AUTH_STORAGE } from "../../constants";

const Header = () => {
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useAuth();

  const loginHandler = () => {
    localStorage.setItem(AUTH_STORAGE, !isAuth);
    setIsAuth(!isAuth);
  };

  return (
    <header className={cls.header}>
      <p onClick={() => navigate("/")}>
        <img src={ReactLogo} alt="react logo" />
        <span>ReactCards</span>
      </p>
      <div className={cls.headerButtons}>
        {isAuth && <Button onClick={() => navigate("/addquestion")}>Add</Button>}
        <Button isActive={!isAuth} onClick={loginHandler}>
          {isAuth ? "Logout" : "Login"}
        </Button>
      </div>
    </header>
  );
};

export default Header;
