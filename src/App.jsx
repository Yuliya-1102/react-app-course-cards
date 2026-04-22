import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { QuestionPage } from "./pages/QuestionPage";
import { AddQuestionPageLazy } from "./pages/AddQuestionPage";
import { EditQuestionPage } from "./pages/EditQuestionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Outlet /> в <MainLayout /> создает чилдрен для страниц */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/forbidden" element={<div>forbidden!!!</div>} />
          <Route path="/addquestion" element={<AddQuestionPageLazy />} />
          {/* Открывается страница при нажатии на карточке на View */}
          <Route path="/question/:id" element={<QuestionPage />} />
          {/* Открывается страница при нажатии на header Edit */}
          <Route path="/editquestion/:id" element={<EditQuestionPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
