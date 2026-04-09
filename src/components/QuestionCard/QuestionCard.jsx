import cls from "./QuestionCard.module.css";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";

const QuestionCard = ({ id, level, question, answer, completed }) => {
  const navigate = useNavigate();

  return (
    <div className={cls.card}>
      <div className={cls.cardLabels}>
        <div>Level: {level}</div>
        <div>{completed ? "Completed" : "Not completed"}</div>
      </div>

      <h5 className={cls.cardTitle}>{question}</h5>

      <div className={cls.cardAnswers}>
        <span>short answer:</span>
        <p className={cls.cardAnswer}>{answer}</p>
      </div>

      <Button onClick={() => navigate(`/question/${id}`)}>View</Button>
    </div>
  );
};

export default QuestionCard;
