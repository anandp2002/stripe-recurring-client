import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false }) => {
    const baseStyle = "px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-black text-white hover:bg-gray-800 border border-transparent",
        secondary: "bg-white text-black border border-black hover:bg-gray-100",
        danger: "bg-red-600 text-white hover:bg-red-700 border border-transparent",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${variants[variant]} ${className}`}
        >
            {children}
        </motion.button>
    );
};

export default Button;
