import { FieldErrors, UseFormRegister } from "react-hook-form"
import { TFormTextConfigAuth, TFormAuth } from "../types"

export const formTextAuth = (register: UseFormRegister<TFormAuth>, errors: FieldErrors<TFormAuth>): TFormTextConfigAuth[] => {
    return [
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