import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditAdvert.css';
import AddPicture from '../assets/AddPicture.svg';
import InputField from './InputField';
import { useTheme } from '../ThemeContext';
import Arrow from '../assets/arrow.svg';

const CATEGORIES_API = 'https://6714904e690bf212c761bbb2.mockapi.io/api/v4/products';
const ADD_ADVERT_API = 'https://6714904e690bf212c761bbb2.mockapi.io/api/v4/products';

const AddAdvert = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [phone, setPhone] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isDarkMode } = useTheme();
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(CATEGORIES_API);
                if (!response.ok) throw new Error('Failed to fetch categories');
                const data = await response.json();
                const uniqueCategories = [...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setMessage('Error fetching categories. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleArrowClick = () => {
        navigate('/main');
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title || !category || !description || !price || !phone) {
            setMessage('Пожалуйста, заполните все обязательные поля.');
            return;
        }

        setSubmitting(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('phone', phone);
        formData.append('additional', additionalInfo);

        if (selectedImage) {
            const imageFile = await fetch(selectedImage).then(res => res.blob());
            formData.append('image', imageFile, 'advert-image.png');
        }

        try {
            const response = await fetch(ADD_ADVERT_API, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create advert');
            }

            setTitle('');
            setCategory('');
            setDescription('');
            setPrice('');
            setPhone('');
            setAdditionalInfo('');
            setSelectedImage(null);
            setMessage('Объявление успешно создано!');
            navigate('/main');
        } catch (error) {
            console.error('Error creating advert:', error);
            setMessage('Ошибка при создании объявления. Пожалуйста, попробуйте еще раз.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div>Загрузка категорий...</div>;

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
                <div className={`page__title ${isDarkMode ? 'dark' : 'light'}`}>Добавить объявление</div>
            </header>
            <main className={`EditAdvertMain ${isDarkMode ? 'dark' : 'light'}`}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="file-upload" className="EditAdvertAdd">
                        <img src={AddPicture} alt="Add Picture" />
                        {selectedImage && <img src={selectedImage} alt="Selected" className="selected-image" />}
                    </label>
                    <input 
                        id="file-upload" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        style={{ display: 'none' }}
                    />
                    <InputField 
                        placeholder="Заголовок"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <select
                        className={`category-select ${isDarkMode ? 'dark' : 'light'}`}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Выберите категорию</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
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
                    <InputField 
                        placeholder="Номер телефона"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <InputField 
                        placeholder="Дополнительная информация"
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                    />
                    <button 
                        type="submit"
                        className={`submit-advert ${isDarkMode ? 'dark' : 'light'}`}
                        disabled={submitting}
                    >
                        {submitting ? 'Сохранение...' : 'Сохранить информацию'}
                    </button>
                    {message && <div className="message">{message}</div>}
                </form>
            </main>
        </div>
    );
};

export default AddAdvert;