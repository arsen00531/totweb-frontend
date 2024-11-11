import React from 'react'
import TextError from '../../UI/errors/TextError'
import FormTextInput from '../FormTextInput/FormTextInput'
import PrimaryButton from '../../UI/buttons/PrimaryButton'
import { TFormCompanyTextConfigRegistration, TFormUserTextConfigRegistration } from '../../pages/Registration/types'

type Props = {
    isUserExists: boolean
    formTextConfig: TFormUserTextConfigRegistration[] | TFormCompanyTextConfigRegistration[]
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined
}

const RegistrationForm = ({ isUserExists, formTextConfig, onSubmit }: Props) => {
  return (
    <div className="auth-form-container">
        <div className="form-wrapper">
        <h1 className="auth-form__header">Регистрация</h1>
        <form className="register-form" onSubmit={onSubmit}>
            {isUserExists && <TextError error={"Пользователь с таким email уже существует"} />}
            {
                formTextConfig.map(
                    (formInput: any) => {
                        return <FormTextInput 
                            key={formInput.id}
                            maxLength={formInput.maxLength} 
                            error={formInput.error} 
                            name={formInput.name} 
                            register={formInput.register} 
                            title={formInput.title}
                            type={formInput.type}
                        />
                    }
                )
            }
            <PrimaryButton text="Отправить" type="submit" />
        </form>
        </div>
    </div>
  )
}

export default RegistrationForm