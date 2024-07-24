import { object, ref, string } from "yup";

export const LoginSchema = object().shape({
  username: string().required("Username is required"),
  password: string().required("Password is required"),
});

export const RegisterSchema = object().shape({
  username: string().required("Name is required"),
  password: string().required("Password is required"),
  confirmPassword: string()
    .required("Confirm password is required")
    .oneOf([ref("password")], "Passwords must match"),
  dob: string().required("Date of birth is required"),
});
