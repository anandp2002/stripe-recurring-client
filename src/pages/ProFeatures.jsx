import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Navbar from '../components/organisms/Navbar';
import { Lock } from 'lucide-react';

const ProFeatures = () => {
    const { isPro } = useSelector((state) => state.subscription);

    const features = [
        {
            title: 'Advanced Analytics',
            description: 'Get detailed insights into your data with custom reports and visualizations.',
            icon: '📊',
        },
        {
            title: 'Priority Support',
            description: '24/7 dedicated support team ready to help you with any issues.',
            icon: '🎯',
        },
        {
            title: 'Custom Integrations',
            description: 'Connect with your favorite tools and automate your workflow.',
            icon: '🔗',
        },
        {
            title: 'Unlimited Storage',
            description: 'Store as much data as you need without any limitations.',
            icon: '💾',
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Pro Features</h1>
                    <p className="text-gray-600">
                        {isPro ? 'Enjoy all the premium features!' : 'Upgrade to Pro to unlock these features'}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`border rounded-lg p-6 ${isPro ? 'border-black' : 'border-gray-300 opacity-60'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-4xl">{feature.icon}</span>
                                {!isPro && <Lock className="w-5 h-5 text-gray-400" />}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProFeatures;
