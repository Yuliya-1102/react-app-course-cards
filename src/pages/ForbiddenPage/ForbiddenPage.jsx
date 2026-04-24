import { useLocation, useNavigate } from "react-router-dom";
import cls from "./ForbiddenPage.module.css";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

const ForbiddenPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuth } = useAuth();

  const fromPage = location.state?.from || "/";

  useEffect(() => {
    isAuth && navigate(fromPage, { replace: true }); // replace отвечает за сохранять или не сохранять предыдущую страницу
  }, [isAuth]);

  return <h2 className={cls.title}>Page is forbidden!</h2>;
};

export default ForbiddenPage;
