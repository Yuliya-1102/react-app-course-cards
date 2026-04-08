import { Button } from "../Button";
import cls from "./Header.module.css";

import ReactLogo from "../../assets/react.svg";

const Header = () => {
  return (
    <header className={cls.header}>
      <p>
        <img src={ReactLogo} alt="react logo" />
        <span>ReactCards</span>
      </p>
      <div className={cls.headerButtons}>
        <Button isDisabled>Add</Button>
        <Button isActive>Login</Button>
      </div>
    </header>
  );
};

export default Header;
