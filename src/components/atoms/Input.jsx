import React from 'react';

const Input = ({ type = 'text', placeholder, value, onChange, name, required = false, className = '' }) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 ${className}`}
        />
    );
};

export default Input;
