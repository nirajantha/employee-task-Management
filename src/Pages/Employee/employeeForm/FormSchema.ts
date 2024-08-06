import * as yup from "yup";
export const schema = yup.object({
  name: yup.string().required("username is required"),
  email: yup
    .string()
    .email("invalid email formate")
    .required("email is required"),
  password: yup.string().required("password is required"),
  passwordConfirm: yup.string().required("confirm password is required"),
});
