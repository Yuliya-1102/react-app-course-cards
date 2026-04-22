import { useActionState } from "react";
import { Loader } from "../../components/Loader/Loader";
import { QuestionForm } from "../../components/QuestionForm";

import cls from "./EditQuestionPage.module.css";
import { delayFn } from "../../helpers/delayFn";
import { API_URL } from "../../constants";
import { toast } from "react-toastify";
import { dateFormat } from "../../helpers/dateFormat";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const EditCardAction = async (_prevState, formData) => {
  try {
    await delayFn(); // function delay

    const newQuestion = Object.fromEntries(formData);
    const resources = newQuestion.resources.trim();
    const questionId = newQuestion.questionId;
    const isClearForm = newQuestion.clearForm; //formData.get("clearForm")

    // делаем запрос на сервер и добавдяем новый обект
    const response = await fetch(`${API_URL}/react/${questionId}`, {
      method: "PATCH",
      body: JSON.stringify({
        question: newQuestion.question,
        answer: newQuestion.answer,
        description: newQuestion.description,
        resources: resources.length ? resources.split(",") : [],
        level: Number(newQuestion.level),
        completed: false,
        editDate: dateFormat(new Date()),
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const question = await response.json();

    toast.success("The question is edited successfully!");

    return isClearForm ? {} : question;
  } catch (error) {
    toast.error(error.message);
    return {};
  }
};

const EditQuestion = ({ initialState = {} }) => {
  const navigate = useNavigate();
  const [formState, formAction, isPending] = useActionState(EditCardAction, { ...initialState, clearForm: false });

  // удаляем элемент
  const [removeQuestion, isQuestionRemoving] = useFetch(async () => {
    await fetch(`${API_URL}/react/${initialState.id}`, {
      method: "DELETE",
    });

    toast.success("The question has been successfully removed");
    navigate("/");
  });

  const onRemoveQuestionHandler = () => {
    const isRemove = confirm("Are you sure?");

    isRemove && removeQuestion();
  };

  return (
    <>
      {(isPending || isQuestionRemoving) && <Loader />}
      <h1 className={cls.formTitle}>Edit question</h1>

      <div className={cls.formContainer}>
        <button className={cls.removeBtn} disabled={isPending || isQuestionRemoving} onClick={onRemoveQuestionHandler}>
          X
        </button>

        <QuestionForm
          state={formState}
          formAction={formAction}
          isPending={isPending || isQuestionRemoving}
          submitBtnText="Edit question"
        />
      </div>
    </>
  );
};

export default EditQuestion;
