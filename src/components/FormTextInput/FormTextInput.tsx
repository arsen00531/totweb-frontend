import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import cl from "./_FormTextInput.module.scss";
import TextError from "../../UI/errors/TextError";

interface IFormTextInput<T extends FieldValues> {
  name: Path<T>;
  type: React.HTMLInputTypeAttribute | undefined;
  title: string;
  isTextarea?: boolean;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
  maxLength?: number;
  key: number;
}

export default function FormTextInput<T extends FieldValues>({
  name,
  register,
  type,
  title,
  isTextarea = false,
  error,
  maxLength,
}: IFormTextInput<T>) {
  return (
    <label className={cl.label} htmlFor={name}>
      <p className={cl.inputTitle}>{title}</p>
      {isTextarea ? (
        <textarea
          maxLength={maxLength ? maxLength : undefined}
          style={error ? { border: "1px solid red" } : {}}
          placeholder={title}
          {...register(name)}
          className={cl.textInput}
          name={name}
          id={name}
        ></textarea>
      ) : (
        <input
          maxLength={maxLength ? maxLength : undefined}
          style={error ? { border: "1px solid red" } : {}}
          placeholder={title}
          type={type}
          {...register(name)}
          className={cl.textInput}
          name={name}
          id={name}
        />
      )}
      <TextError error={error?.message} />
    </label>
  );
}
