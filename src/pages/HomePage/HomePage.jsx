import { useEffect, useState } from "react";

import Loader from "../../components/Loader/Loader";
import QuestionCardList from "../../components/QuestionCardList/QuestionCardList";
import { API_URL, API_RESOURCES } from "../../constants";
import { useFetch } from "../../hooks/useFetch";

import cls from "./HomePage.module.css";
import { SearchInput } from "../../components/SearchInput";

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${API_RESOURCES}`);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status ${response.status}`);
    }

    const questions = await response.json();

    setQuestions(questions);
    return questions;
  });

  useEffect(() => {
    getQuestions(API_RESOURCES);
  }, []);

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div className={cls.controlsContainer}>
        <SearchInput value={searchValue} onChange={onSearchChangeHandler} />
      </div>

      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <QuestionCardList cards={questions} />
    </>
  );
};

export default HomePage;

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
