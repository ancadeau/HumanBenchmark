// FORMS
import { DateValue } from "@nextui-org/react";

export type LoginFormType = {
  username: string;
  password: string;
  rememberMe: boolean;
};

export type RegisterFormType = {
  username: string;
  password: string;
  confirmPassword: string;
  dob: DateValue;
};
