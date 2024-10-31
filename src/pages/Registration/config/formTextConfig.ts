import { FieldErrors, UseFormRegister } from "react-hook-form"
import { TFormTextConfigRegistration, TFormRegistration } from "../types"

export const formTextRegistration = (register: UseFormRegister<TFormRegistration>, errors: FieldErrors<TFormRegistration>): TFormTextConfigRegistration[] => {
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