import yup from "yup";

export const attemptAnswerSchema = yup.object().shape({
  attemptExamId: yup.number().required("attemptExamId is required"),
  questionId: yup.number().required("questionId is required"),
  answerText: yup.string().required("answerText is required"),
});
