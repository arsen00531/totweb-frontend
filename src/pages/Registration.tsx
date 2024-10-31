import { useUser } from "../store/zustand.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import FormTextInput from "../UI/FormTextInput/FormTextInput";

export type TFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Registration = () => {
  const UserSchema: ZodType<TFormValues> = z
    .object({
      firstName: z
        .string()
        .min(3, { message: "FirstName must be at least 3 characters" })
        .includes(";&*#$", { message: "Неваилдное имя!" }),
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
  } = useForm<TFormValues>({
    resolver: zodResolver(UserSchema),
    mode: "onBlur",
  });

  const {} = useUser();

  const onSubmit = handleSubmit((data: TFormValues) => {
    data.confirmPassword;
  });

  return (
    <div className="auth-form-container">
      <div className="form-wrapper">
        <header className="auth-form__header">Регистрация</header>
        <form className="register-form" onSubmit={onSubmit}>
          <FormTextInput
            maxLength={40}
            error={errors.firstName}
            name={"firstName"}
            register={register}
            title="Имя"
            type="text"
          />
          <FormTextInput
            maxLength={40}
            error={errors.lastName}
            name={"lastName"}
            register={register}
            title="Фамилия"
            type="text"
          />
          <FormTextInput
            error={errors.email}
            name={"email"}
            register={register}
            title="Почта"
            type="text"
          />
          <FormTextInput
            error={errors.password}
            name={"password"}
            register={register}
            title="Пароль"
            type="password"
          />
          <FormTextInput
            error={errors.confirmPassword}
            name="confirmPassword"
            register={register}
            title="Повторите пароль"
            type="password"
          />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Registration;
