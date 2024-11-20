import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../assets/arrow.svg';
import './SignIn.css'; 
import InputField from './InputField';
import { useTheme } from '../ThemeContext';

const SignIn = ({ setUser }) => {
    const navigate = useNavigate(); 
    const { isDarkMode } = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        if (!email) {
            setErrorMessage("Email is required!");
            return false;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setErrorMessage("Please enter a valid email!");
            return false;
        }
        if (!password) {
            setErrorMessage("Password is required!");
            return false;
        }
        if (password.length < 6) { 
            setErrorMessage("Password must be at least 6 characters long!");
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const handleSignIn = async () => {
        if (!validateForm()) return;

        const API_URL = 'https://yourapi.com/signin';
        setLoading(true);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            const data = await response.json();

            if (response.ok) {
                setUser(data);
                navigate('/main');
            } else {
                setErrorMessage(data.message || 'Invalid email or password.');
            }
        } catch (error) {
            setErrorMessage("Server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = () => {
        navigate('/create-account');
    };

    return (
        <div className={`SignInWrapper ${isDarkMode ? 'dark' : ''}`}>
            <header className={`SignInHeader ${isDarkMode ? 'dark' : 'light'}`}>
                <img 
                    src={Arrow} 
                    alt="Back to main" 
                    className="arrow"
                    onClick={() => navigate('/main')} 
                    style={{ cursor: 'pointer' }} 
                />
                <div className={`page__title ${isDarkMode ? 'dark' : 'light'}`}>Вход в аккаунт</div>
            </header>
            <main className={`SignInMain ${isDarkMode ? 'dark' : 'light'}`}>
                <InputField 
                    label="Почта" 
                    placeholder="Введите почту" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField 
                    label="Пароль" 
                    placeholder="Введите пароль" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                
                <div className="InputFieldWrapper">
                    <button className="signInButton" onClick={handleSignIn} disabled={loading}>
                        {loading ? 'Вход...' : 'Войти в аккаунт'}
                    </button>
                    <button id='green' className="signInButton" onClick={handleRegister}>Создать новый аккаунт</button>
                    <a id='gray' href="/main">Пропустить</a>
                </div>
            </main>
        </div>
    );
}

export default SignIn;