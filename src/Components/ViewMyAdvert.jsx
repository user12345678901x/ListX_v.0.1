import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';  
import { useTheme } from '../ThemeContext';
import productImg from '../assets/productImg.png';
import Arrow from '../assets/arrow.svg';
import Plus from '../assets/plus.svg'; 
import './DetailView.css';

const ViewMyAdvert = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();

    const handleArrowClick = () => {
        navigate('/profile');
    };

    const handlePlusClick = () => {
        navigate(`/edit-advert/${id}`);
    };

    return (
        <div className={`DetailViewWrapper ${isDarkMode ? 'dark' : 'light'}`}>
            <header className={`DetailViewHeader ${isDarkMode ? 'dark' : ''}`}>
                <img 
                    src={Arrow} 
                    alt="Back to main" 
                    className="arrow" 
                    onClick={handleArrowClick} 
                    style={{ cursor: 'pointer' }} 
                />
                <div className={`page__title ${isDarkMode ? 'dark' : ''}`}>
                    Кроссовки Nike Galaxy A34
                </div>
            </header>
            <main className={`DetailViewMain ${isDarkMode ? 'dark' : ''}`}>
                <div className={`DetailViewMainWrapper ${isDarkMode ? 'dark' : ''}`}>
                    <img src={productImg} alt="" className="ProductImage" />
                    <img 
                        src={Plus} 
                        alt="Add/Edit" 
                        className='plus__btn' 
                        onClick={handlePlusClick} 
                        style={{ cursor: 'pointer' }} 
                    />
                    <div className={`product__description ${isDarkMode ? 'dark' : ''}`}>
                        <span className={`product__title ${isDarkMode ? 'dark' : ''}`}>
                            Snickers Off-White
                        </span>
                        <span className={`account__name ${isDarkMode ? 'dark' : ''}`}>
                            NIKE
                        </span>
                        <span className={`product__price ${isDarkMode ? 'dark' : ''}`}>
                            $38.00
                        </span>
                        <div className={`about__wrapper ${isDarkMode ? 'dark' : ''}`}>
                            <h3 className={`h3 ${isDarkMode ? 'dark' : ''}`}>About</h3>
                            <p className={`about__product ${isDarkMode ? 'dark' : ''}`}>
                                Lorem ipsum dolor sit amet lorem
                                ipsum dolor sit amet lorem ipsum
                                dolor sit amet lorem ipsum dolor 
                                sit amet lorem
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ViewMyAdvert;