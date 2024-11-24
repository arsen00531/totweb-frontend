import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TFormTextConfigVacancy, TFormVacancy } from "../types";

export const formTextVacancy = (
  register: UseFormRegister<TFormVacancy>,
  errors: FieldErrors<TFormVacancy>
): TFormTextConfigVacancy[] => {
  return [
    {
      id: 2,
      name: "title",
      type: "text",
      title: "Заголовок",
      register: register,
      error: errors.title,
    },
    {
      id: 3,
      name: "price",
      type: "text",
      title: "Зарплата",
      register: register,
      error: errors.price,
    },
    {
      id: 4,
      name: "city",
      type: "text",
      title: "Город",
      register: register,
      error: errors.city,
    },
    {
      id: 5,
      name: "description",
      type: "text",
      title: "Описание",
      register: register,
      error: errors.description,
    },
  ];
};
