import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { QuestionPage } from "./pages/QuestionPage";
import { AddQuestionPageLazy } from "./pages/AddQuestionPage";
import { EditQuestionPage } from "./pages/EditQuestionPage";
import { AuthProvider } from "./provider/AuthProvider/AuthProvider";
import { useAuth } from "./hooks/useAuth";
import { Navigate } from "react-router-dom";
import ForbiddenPage from "./pages/ForbiddenPage/ForbiddenPage";
import { ThemeProvider } from "./provider/ThemeProvider/ThemeProvider";

const ProtectedRoutes = () => {
  const { isAuth } = useAuth();
  const location = useLocation();
  // console.log("location: ", location);

  return isAuth ? <Outlet /> : <Navigate to="/forbidden" state={{ from: location.pathname }} replace />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* <Outlet /> в <MainLayout /> создает чилдрен для страниц */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/forbidden" element={<ForbiddenPage />} />
              {/* Открывается страница при нажатии на карточке на View */}
              <Route path="/question/:id" element={<QuestionPage />} />

              <Route element={<ProtectedRoutes />}>
                <Route path="/addquestion" element={<AddQuestionPageLazy />} />
                <Route path="/editquestion/:id" element={<EditQuestionPage />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
