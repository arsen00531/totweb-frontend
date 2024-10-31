import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import FormTextInput from "../../UI/FormTextInput/FormTextInput";
import { AxiosError } from "axios";
import { useState } from "react";
import TextError from "../../UI/errors/TextError";
import PrimaryButton from "../../UI/buttons/PrimaryButton";
import { TFormTextConfigRegistration, TFormRegistration } from "./types";
import { formTextRegistration } from "./config/formTextConfig";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../handlers/users/users";

const Registration = () => {
  const [isUserExists, setIsUserExists] = useState(false)

  const navigate = useNavigate();

  const UserSchema: ZodType<TFormRegistration> = z
    .object({
      firstName: z
        .string()
        .min(3, { message: "FirstName must be at least 3 characters" }).refine((value) => !/[*&^%$#@!)(_+=|]/.test(value), {
            message: 'Невалидные вещи',
          }),
      lastName: z
        .string()
        .min(3, { message: "Lastname must be at least 3 characters" }),
      email: z.string().email({ message: "Invalid email address" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password == data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Пароли не совпадают.",
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormRegistration>({
    resolver: zodResolver(UserSchema),
    mode: "onBlur",
  });
  const formTextConfig: TFormTextConfigRegistration[] = formTextRegistration(register, errors)

  const onSubmit = handleSubmit(async (data: TFormRegistration) => {
    try {
      await createUser({ firstName: data.firstName, lastName: data.lastName, email: data.email, password: data.password })

      navigate('/auth')
    } catch(error) {
      const err = error as AxiosError

      console.log(err)
      if (err.status === 400) {
        setIsUserExists(true)
      }
    }
  });

  return (
    <div className="auth-form-container">
      <div className="form-wrapper">
        <h1 className="auth-form__header">Регистрация</h1>
        <form className="register-form" onSubmit={onSubmit}>
          {isUserExists && <TextError error={"Пользователь с таким email уже существует"} />}
          {
            formTextConfig.map(
              (formInput) => 
                <FormTextInput 
                  key={formInput.id}
                  maxLength={formInput.maxLength} 
                  error={formInput.error} 
                  name={formInput.name} 
                  register={formInput.register} 
                  title={formInput.title}
                  type={formInput.type}
                />
            )
          }
          <PrimaryButton text="Отправить" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Registration;
