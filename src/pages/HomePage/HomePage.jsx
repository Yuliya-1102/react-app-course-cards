import cls from "./HomePage.module.css";
import { QuestionCard } from "../../components/QuestionCard";
import { API_URL, API_RESOURCES } from "../../constants";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [questions, setQuestions] = useState([]);

  const getQuestions = async () => {
    try {
      const response = await fetch(`${API_URL}/${API_RESOURCES}`, {
        cache: "no-store", // отключаем кэш браузера
        headers: { "Cache-Control": "no-cache" }, // явно говорим не использовать кэш
      });
      const questions = await response.json();
      setQuestions(questions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      <div className={cls.cardsWrapper}>
        {questions.map((item, index) => (
          <QuestionCard key={index} {...item} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
