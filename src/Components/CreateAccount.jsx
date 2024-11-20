import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../assets/arrow.svg';
import './CreateAccount.css';
import AddPicture from '../assets/AddPicture.svg';
import InputField from './InputField';
import { useTheme } from '../ThemeContext';

const CreateAccount = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        profileImage: null,
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { isDarkMode } = useTheme();

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setFormData((prevData) => ({ ...prevData, profileImage: file }));
        } else {
            setSelectedImage(null);
            setFormData((prevData) => ({ ...prevData, profileImage: null }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        const { firstName, lastName, username, email, password } = formData;
        let message = '';
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!firstName || !lastName || !username || !email || !password) {
            message = "Все поля обязательны для заполнения!";
        } else if (!emailPattern.test(email)) {
            message = "Введите действительный адрес электронной почты!";
        } else if (password.length < 6) {
            message = "Пароль должен содержать не менее 6 символов!";
        }

        setErrorMessage(message);
        return !message;
    };

    const createAccount = async () => {
        if (!validateForm()) return;

        const { firstName, lastName, username, email, password, profileImage } = formData;
        const accountData = {
            firstName,
            lastName,
            username,
            email,
            password 
        };

        try {
            const userResponse = await fetch('https://6714904e690bf212c761bbb2.mockapi.io/api/v4/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(accountData)
            });

            if (userResponse.ok) {
                const userData = await userResponse.json();

                if (profileImage) {
                    const formDataForApi = new FormData();
                    formDataForApi.append('profileImage', profileImage, profileImage.name);

                    const imageResponse = await fetch(`https://6714904e690bf212c761bbb2.mockapi.io/api/v4/users/${userData.id}/upload_image`, {
                        method: 'POST',
                        body: formDataForApi
                    });

                    if (!imageResponse.ok) {
                        const errorData = await imageResponse.json();
                        setErrorMessage(errorData.message || 'Произошла ошибка при загрузке изображения.');
                        return;
                    }
                }

                setSuccessMessage('Аккаунт успешно создан!');
                setTimeout(() => {
                    navigate('/main');
                }, 2000);
            } else {
                const errorData = await userResponse.json();
                setErrorMessage(errorData.message || 'Произошла ошибка при создании аккаунта.');
            }
        } catch (error) {
            console.error('Network error:', error);
            setErrorMessage("Ошибка сервера. Пожалуйста, попробуйте позже.");
        }
    };

    return (
        <div className={`CreateAccountWrapper ${isDarkMode ? 'dark' : 'light'}`}>
            <header className={`CreateAccountHeader ${isDarkMode ? 'dark' : 'light'}`}>
                <img 
                    src={Arrow} 
                    alt="Back to SignIn" 
                    className="arrow"
                    onClick={() => navigate('/main')}
                    style={{ cursor: 'pointer' }} 
                />
                <div className={`page__title ${isDarkMode ? 'dark' : 'light'}`}>Создайте новый аккаунт</div>
            </header>
            <main className={`CreateAccountMain ${isDarkMode ? 'dark' : 'light'}`}>
                <label htmlFor="file-upload" className="CreateAccountAdd" style={{ cursor: 'pointer', display: 'block', textAlign: 'center' }}>
                    {selectedImage ? (
                        <img src={selectedImage} alt="Selected" className="selected-image circle-image" />
                    ) : (
                        <img className='add-pic' src={AddPicture} alt="Add Picture" />
                    )}
                </label>
                <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                <div className="InputFieldWrapper">
                    <InputField 
                        label="Имя пользователя" 
                        placeholder="Введите имя пользователя" 
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                    <InputField 
                        label="Почта" 
                        placeholder="Введите почту" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <InputField 
                        label="Пароль" 
                        placeholder="Введите пароль" 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    <button className="save__info__edit-profile" onClick={createAccount}>
                        Создать аккаунт
                    </button>
                    <button id='green' className="save__info__edit-profile" onClick={() => navigate('/signin')}>
                        Войти в существующий
                    </button>
                    <a id='gray' href="/main">Пропустить</a>
                </div>
            </main>
        </div>
    );
}

export default CreateAccount;