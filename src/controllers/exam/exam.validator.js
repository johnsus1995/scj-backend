import yup from "yup";

export const addNewExamSchema = yup.object().shape({
  createdBy: yup.number().required("createdBy is required"),
  title: yup.string().required("title is required"),
  description: yup.string().required("description is required"),
  duration: yup.number().required("duration is required"),
  deadline: yup.date().required("deadline is required"),
  published: yup.boolean().required("published is required"),
});

export const attemptExamSchema = yup.object().shape({
  userId: yup.number().required("userId is required"),
  examId: yup.number().required("examId is required"),
  startedAt: yup.date().default(new Date()),
  completedAt: yup.date(),
  score: yup.number(),
  status: yup.string(),
});
