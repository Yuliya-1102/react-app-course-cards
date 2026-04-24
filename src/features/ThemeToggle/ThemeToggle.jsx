import { THEME_STORAGE } from "../../constants";
import { useTheme } from "../../hooks/useTheme";
import cls from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const onChangeHandler = (e) => {
    const isChecked = e.target.checked;
    const updateTheme = isChecked ? "dark" : "light";
    isChecked ? document.body.classList.add("darkThemeLayout") : document.body.classList.remove("darkThemeLayout");

    setTheme(updateTheme);
    localStorage.setItem(THEME_STORAGE, updateTheme);
  };

  return (
    <label className={cls.switch}>
      <input type="checkbox" onChange={onChangeHandler} checked={theme === "dark"} />
      <span className={cls.slider}></span>
      <span className={cls.clouds_stars}></span>
    </label>
  );
};

export default ThemeToggle;
