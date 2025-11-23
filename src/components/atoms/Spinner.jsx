import React from 'react';
import { motion } from 'framer-motion';

const Spinner = ({ size = 'md' }) => {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div className="flex justify-center items-center">
            <motion.div
                className={`${sizes[size]} border-2 border-gray-300 border-t-black rounded-full`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    );
};

export default Spinner;
