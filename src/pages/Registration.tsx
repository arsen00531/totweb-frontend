import React, { useState } from "react";
import { useUser } from "../store/zustand.store";
import Error from "../UI/Error";

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const {  } = useUser()

    const handleRegister = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (confirmation !== password) {
            setError('your confirmation is not right')
            return
        } else {
            setError('')
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Регистрация</h2>
            <form className="register-form" onSubmit={handleRegister}>
                <Error error={error}></Error>
                <label htmlFor="first_name">Имя</label>
                <input value={first_name} name="first_name" onChange={(e) => setFirst_name(e.target.value)} id="fisrt_name" placeholder="Имя" required />
                <label htmlFor="last_name">Фамилия</label>
                <input value={lastName} name="last_name" onChange={(e) => setLastName(e.target.value)} id="last_name" placeholder="Фамилия" required/>
                <label htmlFor="email">Почта</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" required />
                <label htmlFor="password">Пароль</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" required />
                <label htmlFor="confirmPass">Повторите пароль</label>
                <input value={confirmation} onChange={(e) => setConfirmation(e.target.value)} type="password" placeholder="********" id="confirmation" name="confirmation" required />
                <button type="submit">Создать аккаунт</button>
            </form>
            <button className="link-btn">Уже есть аккаунт? Авторизуйтесь</button>
        </div>
    )
}

export default Registration