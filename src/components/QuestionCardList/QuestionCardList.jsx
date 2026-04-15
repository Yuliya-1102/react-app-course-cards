import { memo } from "react";
import cls from "./QuestionCardList.module.css";
import { QuestionCard } from "../QuestionCard";

const QuestionCardList = memo(({ cards }) => {
  return (
    <div className={cls.cardList}>
      {Array.isArray(cards) && cards.length > 0 ? cards.map((card) => <QuestionCard key={card.id} {...card} />) : ""}
    </div>
  );
});

export default QuestionCardList;
