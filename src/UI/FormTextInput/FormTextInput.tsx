import React, { FC } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { TFormValues } from '../../pages/Registration';
import cl from "./_FormTextInput.module.scss"

interface IFormTextInput{
    name : keyof TFormValues,
    type : string,
    title : string,
    register : UseFormRegister<TFormValues>,
    error : FieldError | undefined,
    maxLength? : number
}
const FormTextInput:FC<IFormTextInput> = ({name, register, type, title, error, maxLength}) => {
    return (
        <label className={cl.label} htmlFor={name}>
            <p className={cl.inputTitle}>
                {title}
            </p>
            <input maxLength={maxLength ? maxLength : undefined} style={error ? {border : "1px solid red"} : {}} placeholder={title} type={type} {...register(name)} className={cl.textInput} name={name} />
            {error && <span className={cl.errorMessage}>{error.message}</span>}
        </label>
    );
};

export default React.memo(FormTextInput);