import cls from "./Button.module.css";

const Button = ({ onClick, isActive, isDisabled, children }) => {
  return (
    <button className={`${cls.btn} ${isActive ? cls.active : ""}`} onClick={onClick} disabled={isDisabled}>
      {children}
    </button>
  );
};

export default Button;
