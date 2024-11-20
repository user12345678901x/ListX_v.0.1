import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import Arrow from '../assets/arrow.svg';
import './EditProfile.css';
import AddPicture from '../assets/AddPicture.svg';
import InputField from './InputField';

const EditProfile = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [selectedImage, setSelectedImage] = useState(null); 

    const handleArrowClick = () => {
        navigate('/profile');
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0]; 
        if (file) {
            const imageUrl = URL.createObjectURL(file); 
            setSelectedImage(imageUrl); 
        }
    };

    return (
        <div className={`EditAdvertWrapper ${isDarkMode ? 'dark' : 'light'}`}>
            <header className={`EditAdvertHeader ${isDarkMode ? 'dark' : ''}`}>
                <img 
                    src={Arrow} 
                    alt="Back to profile" 
                    className="arrow"
                    onClick={handleArrowClick}
                    style={{ cursor: 'pointer' }} 
                />
                <div className={`page__title ${isDarkMode ? 'dark' : ''}`}>Профиль</div>
                <label className="toggle-switch">
                    <input
                        type="checkbox"
                        checked={isDarkMode}
                        onChange={toggleDarkMode}
                    />
                    <span className="slider" />
                </label>
            </header>
            <main className={`EditAdvertMain ${isDarkMode ? 'dark' : ''}`}>
                <h3 className={`EditAdverth3 ${isDarkMode ? 'dark' : ''}`}>Редактор профиля</h3>
                <label htmlFor="file-upload" className="EditAdvertAdd" style={{ cursor: 'pointer' }}>
                    <img className='add-pic' src={AddPicture} alt="Add Picture" />
                </label>
                <input 
                    id="file-upload" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    style={{ display: 'none' }} 
                />
                {selectedImage && <img src={selectedImage} alt="Selected" className="selected-image" />}
                <div className={`InputFieldWrapper ${isDarkMode ? 'dark' : ''}`}>
                    <InputField label="Имя" placeholder="Введите имя" className={isDarkMode ? 'dark' : ''} />
                    <InputField label="Фамилия" placeholder="Введите фамилию" className={isDarkMode ? 'dark' : ''} />
                    <InputField label="Имя пользователя" placeholder="Введите имя пользователя" className={isDarkMode ? 'dark' : ''} />
                    <button className={`save__info__edit-profile ${isDarkMode ? 'dark' : ''}`}>
                        Сохранить информацию
                    </button>
                </div>
            </main>
        </div>
    );
}

export default EditProfile;