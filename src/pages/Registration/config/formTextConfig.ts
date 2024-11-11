import { FieldErrors, UseFormRegister } from "react-hook-form"
import { TFormUserTextConfigRegistration, TFormCompanyTextConfigRegistration, TFormUserRegistration, TFormCompanyRegistration } from "../types"

export const userFormTextRegistration = (register: UseFormRegister<TFormUserRegistration>, errors: FieldErrors<TFormUserRegistration>): TFormUserTextConfigRegistration[] => {
  return [
    {
      id: 0,
      name:  "firstName",
      type: "text",
      title: "Имя",
      register: register,
      error: errors.firstName,
      maxLength: 40
    },
    {
      id: 1,
      name:  "lastName",
      type: "text",
      title: "Фамилия",
      register: register,
      error: errors.lastName,
      maxLength: 40
    },
    {
      id: 2,
      name:  "email",
      type: "text",
      title: "Почта",
      register: register,
      error: errors.email,
    },
    {
      id: 3,
      name:  "password",
      type: "password",
      title: "Пароль",
      register: register,
      error: errors.password,
    },
    {
      id: 4,
      name:  "confirmPassword",
      type: "password",
      title: "Подтвердите пароль",
      register: register,
      error: errors.confirmPassword,
    },
  ]
}

export const companyFormTextRegistration = (register: UseFormRegister<TFormCompanyRegistration>, errors: FieldErrors<TFormCompanyRegistration>): TFormCompanyTextConfigRegistration[] => {
  return [
    {
      id: 0,
      name:  "companyName",
      type: "text",
      title: "Название компании",
      register: register,
      error: errors.companyName,
      maxLength: 40
    },
    {
      id: 1,
      name:  "email",
      type: "text",
      title: "Почта",
      register: register,
      error: errors.email,
    },
    {
      id: 2,
      name:  "password",
      type: "password",
      title: "Пароль",
      register: register,
      error: errors.password,
    },
    {
      id: 3,
      name:  "confirmPassword",
      type: "password",
      title: "Подтвердите пароль",
      register: register,
      error: errors.confirmPassword,
    },
    {
      id: 4,
      name:  "contactPerson",
      type: "text",
      title: "Контактное лицо",
      register: register,
      error: errors.contactPerson,
      maxLength: 40
    },
    {
      id: 5,
      name:  "phone",
      type: "text",
      title: "Номер телефона",
      register: register,
      error: errors.phone,
      maxLength: 40
    },
  ]
}