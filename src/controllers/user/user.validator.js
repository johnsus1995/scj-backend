import yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});


export const registerSchema = yup.object().shape({
  scjId: yup
    .number()
    .typeError("SCJ ID must be a valid number") // Custom message for invalid number
    .required("SCJ ID is required"),
  name: yup.string().required("First name is required"),
  roleId: yup
    .number()
    .typeError("Role ID must be a valid number") // Also adding for roleId
    .required("Role ID is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  isAdmin: yup
    .boolean()
    .typeError("Admin status must be true or false") // Custom error for isAdmin
    .required("Admin status is required"),
});
