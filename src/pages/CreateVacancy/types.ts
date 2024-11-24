import { FieldError, UseFormRegister } from "react-hook-form";

export type TFormVacancy = {
  title: string;
  price?: string;
  city: string;
  description: string;
};

export type TFormTextConfigVacancy = {
  id: number;
  name: "title" | "price" | "city" | "description";
  type: React.HTMLInputTypeAttribute | undefined;
  title: string;
  register: UseFormRegister<TFormVacancy>;
  error: FieldError | undefined;
  maxLength?: number;
};
