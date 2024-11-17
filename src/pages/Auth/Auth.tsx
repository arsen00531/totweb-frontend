import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextInput from "../../components/FormTextInput/FormTextInput";
import { AxiosError } from "axios";
import React, { useState } from "react";
import TextError from "../../UI/errors/TextError";
import PrimaryButton from "../../UI/buttons/PrimaryButton";
import { TFormTextConfigAuth, TFormAuth } from "./types";
import { formTextAuth } from "./config/formTextConfig";
import { useNavigate } from "react-router-dom";
import { UserRoles } from "../../models/User";
import UserChoise from "../../UI/blocks/UserChoise";
import { UserAuthSchema } from "./config/userShema";
import { useUser } from "../../store/user.store";
import { HOME_ROUTE } from "../../utils/constants/routes.constants";

const Auth = () => {
  const [isUserExists, setIsUserExists] = useState(true)
  const [isUserActivated, setIsUserActivated] = useState(true)
  const [user, setUser] = useState<UserRoles>()

  const { login } = useUser();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormAuth>({
    resolver: zodResolver(UserAuthSchema),
    mode: "onBlur",
  });
  const formTextConfig: TFormTextConfigAuth[] = formTextAuth(register, errors)

  const onSubmit = handleSubmit(async (data: TFormAuth) => {
    try {
      if (!user) {
        return
      }
      await login(data.email, data.password, [user])

      navigate(HOME_ROUTE)
    } catch(error) {
      const err = error as AxiosError

      if (err.status === 400) {
        setIsUserExists(false)
      } else if (err.status === 401) {
        setIsUserActivated(false)
      }
    }
  });

  return (
    <>
      {
        user ?
          <div className="auth-form-container">
            <div className="form-wrapper">
              <h1 className="auth-form__header">Авторизация</h1>
              <form className="register-form" onSubmit={onSubmit}>
                {!isUserExists && <TextError error={"Пользователя с таким email не существует"} />}
                {!isUserActivated && <TextError error={"Пожалуйста подтвердите вашу почту"} />}
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
          </div> :
          <UserChoise title={"Войти как"} setUser={setUser} />
      }
    </>
  );
};

export default  React.memo(Auth);
