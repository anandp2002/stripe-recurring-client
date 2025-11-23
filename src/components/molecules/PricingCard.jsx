import React from 'react';
import { motion } from 'framer-motion';
import Button from '../atoms/Button';

const PricingCard = ({ title, price, features, onSubscribe, isCurrentPlan = false, loading = false }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="border border-black rounded-lg p-6 flex flex-col"
        >
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-4xl font-bold mb-6">
                ${price}
                <span className="text-lg font-normal text-gray-600">/month</span>
            </p>
            <ul className="mb-6 flex-grow">
                {features.map((feature, index) => (
                    <li key={index} className="mb-2 flex items-start">
                        <span className="mr-2">✓</span>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            {isCurrentPlan ? (
                <Button variant="secondary" disabled className="w-full">
                    Current Plan
                </Button>
            ) : (
                <Button onClick={onSubscribe} className="w-full" disabled={loading}>
                    {loading ? 'Processing...' : 'Subscribe'}
                </Button>
            )}
        </motion.div>
    );
};

export default PricingCard;
