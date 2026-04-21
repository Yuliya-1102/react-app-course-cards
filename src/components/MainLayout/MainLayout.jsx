import { Outlet } from "react-router-dom";
import cls from "./MainLayout.module.css";
import { Header } from "../Header";
import Footer from "../Footer/Footer";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <>
      <div className={cls.mainLayout}>
        <Header />
        <div className={cls.mainWrapper}>
          <main className={cls.main}>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default MainLayout;
