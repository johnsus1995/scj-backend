const yup = require("yup");

const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
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
  isAdmin: yup.boolean().required("Admin status is required"),
  roleId: yup.number().required("Role ID is required"),
  scjId: yup.string().required("SCJ ID is required"),
});

module.exports = {
  registerSchema,
};
