import { FieldError, UseFormRegister } from "react-hook-form";

export type TFormRegistration = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  
export type TFormTextConfigRegistration = {
    id: number,
    name:  "firstName" | "lastName" | "email" | "password" | "confirmPassword",
    type: React.HTMLInputTypeAttribute | undefined,
    title: string,
    register: UseFormRegister<TFormRegistration>,
    error: FieldError | undefined,
    maxLength?: number
  }