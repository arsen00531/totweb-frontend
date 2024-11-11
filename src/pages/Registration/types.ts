import { FieldError, UseFormRegister } from "react-hook-form";

export type TFormUserRegistration = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type TFormCompanyRegistration = {
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactPerson: string;
  phone: string;
};
  
export type TFormUserTextConfigRegistration = {
  id: number,
  name:  "firstName" | "lastName" | "email" | "password" | "confirmPassword",
  type: React.HTMLInputTypeAttribute | undefined,
  title: string,
  register: UseFormRegister<TFormUserRegistration>,
  error: FieldError | undefined,
  maxLength?: number
}

export type TFormCompanyTextConfigRegistration = {
  id: number,
  name:  "companyName" | "email" | "password" | "confirmPassword" | "contactPerson" | "phone",
  type: React.HTMLInputTypeAttribute | undefined,
  title: string,
  register: UseFormRegister<TFormCompanyRegistration>,
  error: FieldError | undefined,
  maxLength?: number
}