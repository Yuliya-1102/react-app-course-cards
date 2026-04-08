import { Outlet } from "react-router-dom";
import cls from "./MainLayout.module.css";

const MainLayout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={cls.mainLayout}>
      <header>header</header>
      <div className={cls.mainWrapper}>
        <main className={cls.main}>
          <Outlet />
        </main>
        <footer className={cls.footer}>
          React Querstion Cards Application | {currentYear} <br /> by Yiliya
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
