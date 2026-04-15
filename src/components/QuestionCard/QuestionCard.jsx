import cls from "./QuestionCard.module.css";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { Badge } from "../Badge";

const QuestionCard = ({ id, level, question, answer, completed }) => {
  const navigate = useNavigate();

  const levelVariant = level === 1 ? "primary" : level === 2 ? "warning" : "alert";
  const completedVariant = completed ? "success" : "primary";

  return (
    <div className={cls.card}>
      <div className={cls.cardLabels}>
        <Badge variant={levelVariant}>Level: {level}</Badge>
        <Badge variant={completedVariant}>{completed ? "Completed" : "Not completed"}</Badge>
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
