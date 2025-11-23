import React from 'react';
import { motion } from 'framer-motion';

const AuthLayout = ({ children, title }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 border border-black rounded-lg"
            >
                <h1 className="text-3xl font-bold text-center mb-8">{title}</h1>
                {children}
            </motion.div>
        </div>
    );
};

export default AuthLayout;
