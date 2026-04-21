import { Outlet } from "react-router-dom";
import cls from "./MainLayout.module.css";
import { Header } from "../Header";
import Footer from "../Footer/Footer";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react"; //работает вместе с lazy для красивого подгрузки
import { Loader } from "../Loader/Loader";

const MainLayout = () => {
  return (
    <>
      <div className={cls.mainLayout}>
        <Header />
        <div className={cls.mainWrapper}>
          <main className={cls.main}>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </main>
          <Footer />
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default MainLayout;
