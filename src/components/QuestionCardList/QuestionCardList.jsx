import cls from "./QuestionCardList.module.css";
import { QuestionCard } from "../QuestionCard";

const QuestionCardList = ({ cards }) => {
  return (
    <div className={cls.cardList}>
      {cards.map((item, index) => (
        <QuestionCard key={index} {...item} />
      ))}
    </div>
  );
};

export default QuestionCardList;
