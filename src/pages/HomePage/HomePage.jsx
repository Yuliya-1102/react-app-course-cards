import Loader from "../../components/Loader/Loader";
import QuestionCardList from "../../components/QuestionCardList/QuestionCardList";
import { API_URL, API_RESOURCES } from "../../constants";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

const HomePage = () => {
  const [questions, setQuestions] = useState([]);

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`, {
      cache: "no-store", // отключаем кэш браузера
      headers: { "Cache-Control": "no-cache" }, // явно говорим не использовать кэш
    });
    const questions = await response.json();
    setQuestions(questions);
  });

  // const fetchQuestions = async () => {
  //   try {
  //     setIsLoading(true);

  //     await delayFn();

  //     const response = await fetch(`${API_URL}/${API_RESOURCES}`, {
  //       cache: "no-store", // отключаем кэш браузера
  //       headers: { "Cache-Control": "no-cache" }, // явно говорим не использовать кэш
  //     });
  //     const questions = await response.json();
  //     setQuestions(questions);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    getQuestions("react1");
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <QuestionCardList cards={questions} />
    </>
  );
};

export default HomePage;
