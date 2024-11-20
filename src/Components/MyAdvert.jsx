import React from 'react';
import './Card.css';
import { useNavigate } from 'react-router-dom';

const MyAdvert = ({ onClick, id, title, price, imageUrl }) => {
    const navigate = useNavigate();

    const handleAdvertClick = () => {
        navigate(`/view-my-advert/${id}`);
    };

    return (
        <div className="wrapper" onClick={handleAdvertClick} style={{ cursor: 'pointer' }}>
            <div className="inner__wrapper">
                <img src={imageUrl} alt={title} className="product__img" />
                <div className="product__description">
                    <span className='product__title'>
                        {title}
                    </span>
                    <span className="account__name">
                        NIKE
                    </span>
                    <span className="product__price">
                        {price}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MyAdvert;