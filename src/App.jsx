import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { QuestionPage } from "./pages/QuestionPage";
import { AddQuestionPageLazy } from "./pages/AddQuestionPage";
import { EditQuestionPage } from "./pages/EditQuestionPage";
import { AuthProvider } from "./auth/AuthProvider/AuthProvider";
// import { useAuth } from "./hooks/useAuth";

// const ProtectedRoutes = () => {
//   const { isAuth } = useAuth();

//   return isAuth ? <Outlet /> : "";
// };

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* <Outlet /> в <MainLayout /> создает чилдрен для страниц */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/forbidden" element={<div>forbidden!!!</div>} />
            {/* Открывается страница при нажатии на карточке на View */}
            <Route path="/question/:id" element={<QuestionPage />} />

            <Route path="/addquestion" element={<AddQuestionPageLazy />} />
            <Route path="/editquestion/:id" element={<EditQuestionPage />} />

            {/* <Route element={<ProtectedRoutes />}>
              <Route path="/addquestion" element={<AddQuestionPageLazy />} />
              <Route path="/editquestion/:id" element={<EditQuestionPage />} />
            </Route> */}

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
