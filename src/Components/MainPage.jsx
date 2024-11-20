import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MainPage.css';
import SearchIcon from '../assets/SearchIcon.svg';
import Burger from '../assets/Burger.svg';
import Card from './Card.jsx';
import { useTheme } from '../ThemeContext';
import SplashScreen from './SplashScreen';
import SortByTime from '../assets/SortByTime.svg';
import SortByPrice from '../assets/SortByPrice.svg';

const MainPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isDarkMode } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [advertisements, setAdvertisements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSplashScreen, setShowSplashScreen] = useState(true);
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const PRODUCT_API = 'https://6714904e690bf212c761bbb2.mockapi.io/api/v4/products';

    useEffect(() => {
        const fetchAdvertisements = async () => {
            setShowSplashScreen(true);
            try {
                const response = await fetch(PRODUCT_API);
                const data = await response.json();
                setAdvertisements(data);
            } catch (error) {
                console.error("Failed to fetch advertisements:", error);
            } finally {
                setLoading(false);
                setShowSplashScreen(false);
            }
        };

        fetchAdvertisements();
    }, [PRODUCT_API]);

    const selectedCategory = location.state?.selectedCategory;

    const filteredAds = advertisements.filter(ad => {
        return selectedCategory ? ad.category === selectedCategory : true;
    }).filter(ad => ad.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const sortedAds = [...filteredAds].sort((a, b) => {
        if (sortOption === 'price') {
            return a.price - b.price;
        } else if (sortOption === 'date') {
            return new Date(b.date) - new Date(a.date);
        }
        return 0;
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCardClick = (id) => {
        const ad = advertisements.find(ad => ad.id === id);
        navigate(`/detail/${ad.id}`, { state: ad });
    };

    const toggleSidebar = () => {
        setSidebarVisible(prevState => !prevState);
    };

    if (showSplashScreen) {
        return <SplashScreen />;
    }

    return (
        <div className={`_wrapper ${isDarkMode ? 'dark' : 'light'}`}>
            <header className={`header ${isDarkMode ? 'dark' : 'light'}`}>
                <span className='ListX'>ListX</span>
                <div className={`searchbar__wrapper ${isDarkMode ? 'dark' : 'light'}`}>
                    <img src={SearchIcon} alt="Search" className="search__icon" />
                    <input
                        type="text"
                        className={`search__input ${isDarkMode ? 'dark' : 'light'}`}
                        placeholder='Search listings'
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className="burger__btn" onClick={toggleSidebar}>
                        <img src={Burger} alt="Burger" className="burger__img" />
                    </button>
                </div>
            </header>

            {sidebarVisible && (
                <div className={`sidebar ${isDarkMode ? 'dark' : 'light'}`}>
                    <button onClick={toggleSidebar} className="close-button">X</button>
                    <nav>
                        <ul>
                            <li onClick={() => { navigate('/main'); toggleSidebar(); }}>Home</li>
                            <li onClick={() => { navigate('/add-advert'); toggleSidebar(); }}>Add Advert</li>
                            <li onClick={() => { navigate('/profile'); toggleSidebar(); }}>Profile</li>
                            <li onClick={() => { navigate('/categories'); toggleSidebar(); }}>Categories</li>
                        </ul>
                    </nav>
                </div>
            )}

            <main className={`main ${isDarkMode ? 'dark' : 'light'}`}>
                <div className="sort-icons">
                    <img 
                        src={SortByTime} 
                        alt="Sort by Time" 
                        className={`sort-icon ${sortOption === 'date' ? 'active' : ''}`} 
                        onClick={() => setSortOption('date')}
                    />
                    <img 
                        src={SortByPrice} 
                        alt="Sort by Price" 
                        className={`sort-icon ${sortOption === 'price' ? 'active' : ''}`} 
                        onClick={() => setSortOption('price')}
                    />
                </div>
                <div className="card__container">
                    {sortedAds.map(ad => (
                        <Card 
                            key={ad.id}
                            title={ad.title} 
                            price={`${ad.price}$`} 
                            desc={ad.desc} 
                            category={ad.category}
                            image={ad.image} 
                            phoneNumber={ad.phoneNumber}
                            onClick={() => handleCardClick(ad.id)}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default MainPage;