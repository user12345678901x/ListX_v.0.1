import React from 'react';
import './Card.css';

const Card = ({ onClick, price, title, desc, image, category, phoneNumber }) => {
    const MAX_DESC_LENGTH = 30;

    const truncatedDesc = desc.length > MAX_DESC_LENGTH 
        ? desc.substring(0, MAX_DESC_LENGTH) + '...' 
        : desc;

    return (
        <div className="wrapper" onClick={onClick} style={{ cursor: 'pointer' }}>
            <div className="inner__wrapper">
                <img src={image} alt={title} className="product__img" />
                <div className="product__descriptionc">
                    <span className='product__title'>{title}</span>
                    <span className="product__price">{price}</span>
                    <span className="product__category">{category}</span>
                </div>
            </div>
        </div>
    );
};

export default Card;