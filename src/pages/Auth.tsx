import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email);
    }
  
    return (
      <div className="auth-form-container">
            <h2>Авторизация</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">почта</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">пароль</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Вход</button>
            </form>
            {/* <button className="link-btn" onClick={() => onFormSwitch('register')}>Нет аккаунта? Зарегистрируйтесь здесь.</button> */}
        </div>
    )
}

export default Auth;