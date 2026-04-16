import { useEffect, useMemo, useRef, useState } from "react";

import Loader from "../../components/Loader/Loader";
import QuestionCardList from "../../components/QuestionCardList/QuestionCardList";
import { API_URL, API_RESOURCES } from "../../constants";
import { useFetch } from "../../hooks/useFetch";

import cls from "./HomePage.module.css";
import { SearchInput } from "../../components/SearchInput";
import { Button } from "../../components/Button";

const HomePage = () => {
  const [questions, setQuestions] = useState({});
  const [searchValue, setSearchValue] = useState(""); // ФИЛЬТРАЦИЯ на фронте, без серверного запроса
  const [sortSelectValue, setSortSelectValue] = useState(""); // СОРТИРОВКА С ЗАПРОСОМ НА СЕРВЕР
  const [countSelectValue, setCountSelectValue] = useState(""); // СОРТИРОВКА по количеству на страницу
  const [searchParams, setSearchParams] = useState(`?_page=1&_per_page=${countSelectValue}`); // ПАГИНАЦИЯ ПО СТР С ЗАПРОСОМ НА СЕРВЕР
  const controlsContainerRef = useRef(""); // для скролла вверх

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
    if (questions?.data) {
      if (searchValue.trim()) {
        return questions.data.filter((d) => d.question.toLowerCase().includes(searchValue.trim().toLowerCase()));
      } else {
        return questions.data;
      }
    }
    return [];
  }, [questions, searchValue]);

  // ПАГИНАЦИЯ (json-server)
  useEffect(() => {
    getQuestions(`react${searchParams}`);
  }, [searchParams]);

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  // СОРТИРОВКА
  const onSortChangeHandler = (e) => {
    setSortSelectValue(e.target.value);

    setSearchParams(`?_page=1&_per_page=${countSelectValue}&${e.target.value}`);
  };

  // переключение количества карточек на странице
  const onCountSelectChangeHandler = (e) => {
    setCountSelectValue(e.target.value);

    setSearchParams(`?_page=1&_per_page=${e.target.value}&${sortSelectValue}`);
  };

  // создаем кнопки
  const pagination = useMemo(() => {
    const totalPages = questions?.pages || 0;

    return Array(totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }, [questions]);

  // по клику на кнопку меняем страницу
  const paginationHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      setSearchParams(`?_page=${e.target.textContent}&_per_page=${countSelectValue}&${sortSelectValue}`);

      controlsContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getActivePageNumber = () => (questions.next === null ? questions.last : questions.next - 1);

  return (
    <>
      <div className={cls.controlsContainer} ref={controlsContainerRef}>
        <SearchInput value={searchValue} onChange={onSearchChangeHandler} />

        <select value={sortSelectValue} onChange={onSortChangeHandler} className={cls.select}>
          <option value="">sort by</option>
          <hr />
          <option value="_sort=level">level ABS</option>
          <option value="_sort=-level">level DESC</option>
          <option value="_sort=completed">completed ABS</option>
          <option value="_sort=-completed">completed DESC</option>
        </select>

        <select value={countSelectValue} onChange={onCountSelectChangeHandler} className={cls.select}>
          <option value="" disabled>
            count
          </option>
          <hr />
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      {isLoading && <Loader />}
      {error && <p>{error}</p>}

      <QuestionCardList cards={cards} />

      {cards.length === 0 ? (
        <p className={cls.noCardsInfo}>No cards</p>
      ) : (
        pagination > 1 && (
          <div className={cls.paginationContainer} onClick={paginationHandler}>
            {pagination.map((btn) => {
              return (
                <Button key={btn} isActive={btn === getActivePageNumber()}>
                  {btn}
                </Button>
              );
            })}
          </div>
        )
      )}
    </>
  );
};

export default HomePage;
