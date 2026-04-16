import { useEffect, useMemo, useState } from "react";

import Loader from "../../components/Loader/Loader";
import QuestionCardList from "../../components/QuestionCardList/QuestionCardList";
import { API_URL, API_RESOURCES } from "../../constants";
import { useFetch } from "../../hooks/useFetch";

import cls from "./HomePage.module.css";
import { SearchInput } from "../../components/SearchInput";

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");

  // собственный хук -------------------------------
  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`, {
      cache: "no-store", // отключаем кэш браузера
      headers: { "Cache-Control": "no-cache" }, // явно говорим не использовать кэш
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status ${response.status}`);
    }

    const questions = await response.json();

    setQuestions(questions);
    return questions;
  });
  // END ----------------------------

  // ФИЛЬТРАЦИЯ завернули в useMemo,
  const cards = useMemo(() => {
    return questions.filter((d) => d.question.toLowerCase().includes(searchValue.trim().toLowerCase()));
  }, [questions, searchValue]);

  // СОРТИРОВКА ?_sort=level&_order=asc (json-server)
  useEffect(() => {
    getQuestions(`${API_RESOURCES}?${sortSelectValue}`);
    // getQuestions(`react?_page=1&_per_page=5`);
  }, [sortSelectValue]);

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const onSortChangeHandler = (e) => {
    setSortSelectValue(e.target.value);
  };

  return (
    <>
      <div className={cls.controlsContainer}>
        <SearchInput value={searchValue} onChange={onSearchChangeHandler} />

        <select value={sortSelectValue} onChange={onSortChangeHandler} className={cls.select}>
          <option value="">sort by</option>
          <hr />
          <option value="_sort=level">level ABS</option>
          <option value="_sort=-level">level DESC</option>
          <option value="_sort=completed">completed ABS</option>
          <option value="_sort=-completed">completed DESC</option>
        </select>
      </div>

      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {cards.length === 0 && <p className={cls.noCardsInfo}>No cards</p>}
      <QuestionCardList cards={cards} />
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
