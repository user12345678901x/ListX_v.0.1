import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.css';
import Arrow from '../assets/arrow.svg';
import SplashScreen from './SplashScreen'; 
import { useTheme } from '../ThemeContext';
const CATEGORIES_API = 'https://6714904e690bf212c761bbb2.mockapi.io/api/v4/products';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSplashScreen, setShowSplashScreen] = useState(true);
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const handleArrowClick = () => {
        navigate('/main'); 
    };
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(CATEGORIES_API);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                const uniqueCategories = [...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError(error.message);
            } finally {
                setLoading(false);
                setShowSplashScreen(false);
            }
        };

        const timer = setTimeout(() => {
            fetchProducts();
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (showSplashScreen) {
        return <SplashScreen />;
    }

    if (loading) {
        return <div className="loading">Loading categories...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    const handleCategoryClick = (category) => {
        navigate('/main', { state: { selectedCategory: category } });
    };

    return (
        <div className="categories-container">
            <header className={`CategoriesHeader ${isDarkMode ? 'dark' : 'light'}`}>
                <img 
                    src={Arrow} 
                    alt="Back to main" 
                    className="arrowd" 
                    onClick={handleArrowClick}
                    style={{ cursor: 'pointer' }}
                />
                <div className={`page__title ${isDarkMode ? 'dark' : ''}`}>Категории</div>
            </header>
            <div className="categories-grid">
                {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <div key={index} className="category-box" onClick={() => handleCategoryClick(category)}>
                            <h2>{category}</h2>
                        </div>
                    ))
                ) : (
                    <p>No categories available.</p>
                )}
            </div>
        </div>
    );
};

export default Categories;