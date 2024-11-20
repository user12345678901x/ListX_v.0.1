import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditAdvert.css';
import AddPicture from '../assets/AddPicture.svg';
import InputField from './InputField';
import { useTheme } from '../ThemeContext';
import Arrow from '../assets/arrow.svg';

const EditAdvert = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const { isDarkMode } = useTheme();

    const handleArrowClick = () => {
        navigate(`/view-my-advert/${id}`);
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
            <header className={`EditAdvertHeader ${isDarkMode ? 'dark' : 'light'}`}>
                <img 
                    src={Arrow} 
                    alt="Back to main" 
                    className="arrow"
                    onClick={handleArrowClick}
                    style={{ cursor: 'pointer' }}
                />
                <div className="product__title">Объявление</div>
            </header>
            <main className={`EditAdvertMain ${isDarkMode ? 'dark' : 'light'}`}>
                <label htmlFor="file-upload" className="EditAdvertAdd" style={{ cursor: 'pointer' }}>
                    <img src={AddPicture} alt="Add Picture" />
                </label>
                <input 
                    id="file-upload" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    style={{ display: 'none' }}
                />
                {selectedImage && <img src={selectedImage} alt="Selected" className="selected-image" />}
                <div className="InputFieldWrapper">
                    <InputField 
                        placeholder="Заголовок"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <InputField 
                        placeholder="Категория"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <InputField 
                        placeholder="Описание"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <InputField 
                        placeholder="Цена"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    
                    <button className={`save__info__edit-advert ${isDarkMode ? 'dark' : 'light'}`}>
                        Сохранить информацию
                    </button>
                </div>
                <button className={`delete__btn__edit-advert ${isDarkMode ? 'dark' : 'light'}`}>
                    Удалить объявление
                </button>
            </main>
        </div>
    );
}

export default EditAdvert;