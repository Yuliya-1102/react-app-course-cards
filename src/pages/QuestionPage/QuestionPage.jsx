import { useNavigate, useParams } from "react-router-dom";
import cls from "./QuestionPage.module.css";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { useEffect, useId, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { SmallLoader, Loader } from "../../components/Loader/Loader";
import { API_URL } from "../../constants";

const QuestionPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [card, setCard] = useState(null);
  const navigate = useNavigate();
  const checkboxId = useId();
  const { id } = useParams(); // из стр App.js <Route path="/question/:id" element={<QuestionPage />} />

  const levelVariant = () => (card.level === 1 ? "primary" : card.level === 2 ? "warning" : "alert");
  const completedVariant = () => (card.completed ? "success" : "primary");

  // собственный хук -------------------------------
  const [fetchCard, isCardLoading] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${id}`, {
      cache: "no-store", // отключаем кэш браузера
      headers: { "Cache-Control": "no-cache" }, // явно говорим не использовать кэш
    });

    const data = await response.json();

    setCard(data);
  });
  // END ----------------------------

  const [updateCard, isCardUpdating] = useFetch(async (isChecked) => {
    const response = await fetch(`${API_URL}/react/${id}`, {
      cache: "no-store", // отключаем кэш браузера
      headers: { "Cache-Control": "no-cache" }, // явно говорим не использовать кэш
      method: "PATCH", // похоже на post запрос, только с частичной заменой свойств "completed"
      body: JSON.stringify({ completed: isChecked }),
    });

    const data = await response.json();

    setCard(data);
  });

  useEffect(() => {
    fetchCard();
  }, []);

  // useEffect(() => {
  //   card !== null && setIsChecked(card.completed);
  // }, [card.completed]);

  const onChangeCheckboxHandler = () => {
    setIsChecked(!isChecked);
    updateCard(!isChecked);
  };

  return (
    <>
      {isCardLoading && <Loader />}

      {card !== null && (
        <div className={cls.container}>
          <div className={cls.cardLabels}>
            <Badge variant={levelVariant()}>Level: {card.level}</Badge>
            <Badge variant={completedVariant()}>{card.completed ? "Completed" : "Not completed"}</Badge>
            {card?.editDate && <p className={cls.editDate}>{`Edited: ${card.editDate}`}</p>}
          </div>

          <h5 className={cls.cardTitle}>{card.question}</h5>
          <p className={cls.cardDescription}>{card.description}</p>

          <div className={cls.cardAnswers}>
            <span>short answer:</span>
            <p className={cls.cardAnswer}>{card.answer}</p>
          </div>

          <ul className={cls.cardLinks}>
            {card.resources.map((link, index) => (
              <li key={index}>
                <a href={link.trim()} target="_blank">
                  {link.trim()}
                </a>
              </li>
            ))}
          </ul>

          <label htmlFor={checkboxId} className={cls.cardCheckbox}>
            <input
              type="checkbox"
              id={checkboxId}
              className={cls.checkbox}
              checked={card?.completed ?? false}
              onChange={onChangeCheckboxHandler}
              disabled={isCardUpdating}
            />
            <span>mark question is completed</span>
            {isCardUpdating && <SmallLoader />}
          </label>

          <Button onClick={() => navigate(`/editquestion/${card.id}`)} isDisabled={isCardUpdating}>
            Edit question
          </Button>
          <Button onClick={() => navigate("/")} isDisabled={isCardUpdating}>
            Back
          </Button>
        </div>
      )}
    </>
  );
};

export default QuestionPage;
