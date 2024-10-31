import { FieldError, UseFormRegister } from "react-hook-form";

export type TFormAuth = {
    email: string;
    password: string;
    confirmPassword: string;
  };
  
export type TFormTextConfigAuth = {
    id: number,
    name:  "email" | "password" | "confirmPassword",
    type: React.HTMLInputTypeAttribute | undefined,
    title: string,
    register: UseFormRegister<TFormAuth>,
    error: FieldError | undefined,
    maxLength?: number
  }