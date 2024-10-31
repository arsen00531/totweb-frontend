import { useUser } from "../../store/zustand.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import FormTextInput from "../../UI/FormTextInput/FormTextInput";
import { AxiosError } from "axios";
import { useState } from "react";
import TextError from "../../UI/errors/TextError";
import PrimaryButton from "../../UI/buttons/PrimaryButton";
import { TFormTextConfigAuth, TFormAuth } from "./types";
import { formTextAuth } from "./config/formTextConfig";
import { loginUser } from "../../handlers/users/users";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [, setCookies] = useCookies()
  const [isUserExists, setIsUserExists] = useState(true)

  const { setUser } = useUser();
  const navigate = useNavigate();
  
  const UserSchema: ZodType<TFormAuth> = z
    .object({
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
  } = useForm<TFormAuth>({
    resolver: zodResolver(UserSchema),
    mode: "onBlur",
  });
  const formTextConfig: TFormTextConfigAuth[] = formTextAuth(register, errors)

  const onSubmit = handleSubmit(async (data: TFormAuth) => {
    try {
      const response = await loginUser({ email: data.email, password: data.password })

      setUser({...response, isUser: true})

      setCookies('token', response.accessToken)
      navigate('/')
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
        <h1 className="auth-form__header">Авторизация</h1>
        <form className="register-form" onSubmit={onSubmit}>
          {!isUserExists && <TextError error={"Пользователя с таким email не существует"} />}
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
          <PrimaryButton text="Войти" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Auth;
