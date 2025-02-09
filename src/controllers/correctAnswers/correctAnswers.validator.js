import yup from "yup";

export const addNewCorrectAnswerSchema = yup.object().shape({
  questionId: yup.number().required("questionId is required"),
  answerText: yup.string().required("answerText is required"),
  keywords: yup
    .array()
    .of(yup.string().trim().min(1, "Keyword cannot be empty"))
    .min(1, "At least one keyword is required")
    .required("Keywords are required"),
});
