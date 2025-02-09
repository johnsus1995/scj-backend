import yup from "yup";

export const addNewQuestionSchema = yup.object().shape({
  examId: yup.number().required("examId is required"),
  text: yup.string().required("question is required"),
});
