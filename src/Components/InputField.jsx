import React from 'react';
import './InputField.css';
import { useTheme } from '../ThemeContext';

const InputField = ({ label, placeholder, value, onChange, name, type = "text" }) => {
    const { isDarkMode } = useTheme();
    
    return (
        <div className="input-field">
            <input
                className={`input__field-wrapper ${isDarkMode ? 'dark' : 'light'}`}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default InputField;