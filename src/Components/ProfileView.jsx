import React, { useEffect, useState } from "react";
import './ProfileView.css';
import Settings from '../assets/Settings.svg';
import { useNavigate } from 'react-router-dom';  
import Arrow from '../assets/arrow.svg';
import JotaroPfp from '../assets/Jotaropfp.png';
import MyAdvert from "./MyAdvert";
import { useTheme } from '../ThemeContext';

const ProfileView = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();

    const handleArrowClick = () => {
        navigate('/main'); 
    };

    const handleSettingsClick = () => {
        navigate('/edit-profile'); 
    };

    const [adverts, setAdverts] = useState([]);

    useEffect(() => {
        const fetchAdverts = async () => {
            try {
                const response = await fetch('https://6714904e690bf212c761bbb2.mockapi.io/api/v4/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAdverts(data);
            } catch (error) {
                console.error('Error fetching adverts:', error);
            }
        };

        fetchAdverts();
    }, []);

    return (
        <div className={`ProfileViewWrapper ${isDarkMode ? 'dark' : 'light'}`}>
            <header className={`ProfileViewHeader ${isDarkMode ? 'dark' : ''}`}>
                <img 
                    src={Arrow} 
                    alt="Back to main" 
                    className="arrow" 
                    onClick={handleArrowClick}
                    style={{ cursor: 'pointer' }} 
                />
                <div className={`ProfileView__title ${isDarkMode ? 'dark' : ''}`}>Профиль</div>
                <img 
                    src={Settings} 
                    alt="settings" 
                    className="settings" 
                    style={{ cursor: 'pointer' }}
                    onClick={handleSettingsClick}
                />
            </header>
            <main className={`ProfileViewMain ${isDarkMode ? 'dark' : ''}`}>
                <div className={`profile ${isDarkMode ? 'dark' : ''}`}>
                    <img className="attachment" src={JotaroPfp} alt="pfp" />
                    <div className={`profile__info ${isDarkMode ? 'dark' : ''}`}>
                        <span className={`name ${isDarkMode ? 'dark' : ''}`}>Name LastName</span>
                        <p className={`user__description ${isDarkMode ? 'dark' : ''}`}>
                            zxczcxzcxzcxcxzxccxzcxzcxczxcxczczxxczczcxzxcxzzxczcxzcxzcxzxczxcx
                        </p>
                        <a className={`username ${isDarkMode ? 'dark' : ''}`} href="">@user77</a>
                    </div>
                </div>
                <div className={`my__adverts ${isDarkMode ? 'dark' : ''}`}>
                    <span className={`my__adverts-span ${isDarkMode ? 'dark' : ''}`}>
                        Объявления
                    </span>
                    <div className={`adverts__list ${isDarkMode ? 'dark' : ''}`}>
                        {adverts.map(advert => (
                            <MyAdvert 
                                key={advert.id} 
                                id={advert.id} 
                                title={advert.title} 
                                price={advert.price} 
                                imageUrl={advert.imageUrl} 
                            />
                        ))}
                    </div>
                </div>
            </main> 
        </div>
    );
}

export default ProfileView;