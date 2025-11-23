import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebase';
import { setSubscriptionStatus } from '../store/subscriptionSlice';
import Navbar from '../components/organisms/Navbar';
import PricingCard from '../components/molecules/PricingCard';
import Button from '../components/atoms/Button';
import Spinner from '../components/atoms/Spinner';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const { isPro } = useSelector((state) => state.subscription);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchUserData = async () => {
            try {
                const token = await auth.currentUser.getIdToken();
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/users/sync`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setUserData(response.data);
                dispatch(setSubscriptionStatus({
                    isPro: response.data.isPro || false,
                    subscriptionStatus: response.data.subscriptionStatus || null,
                }));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [user, navigate, dispatch]);

    const handleSubscribe = async (priceId) => {
        setLoading(true);
        try {
            const token = await auth.currentUser.getIdToken();
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/users/create-subscription`,
                { priceId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            window.location.href = response.data.url;
        } catch (error) {
            console.error('Error creating subscription:', error);
            alert('Failed to create subscription');
        } finally {
            setLoading(false);
        }
    };

    const handleManageSubscription = async () => {
        setLoading(true);
        try {
            const token = await auth.currentUser.getIdToken();
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/users/create-portal`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            window.location.href = response.data.url;
        } catch (error) {
            console.error('Error creating portal session:', error);
            alert('Failed to open billing portal');
        } finally {
            setLoading(false);
        }
    };

    if (!userData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold mb-2">Welcome to SubApp</h1>
                <p className="text-gray-600 mb-8">Manage your subscription and access premium features</p>

                {isPro ? (
                    <div className="mb-12">
                        <div className="border border-black rounded-lg p-6">
                            <h2 className="text-2xl font-bold mb-4">You're a Pro Member! 🎉</h2>
                            <p className="mb-4">You have access to all premium features.</p>
                            <Button onClick={handleManageSubscription} disabled={loading}>
                                Manage Subscription
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Choose Your Plan</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <PricingCard
                                title="Free"
                                price="0"
                                features={['Basic features', 'Limited access', 'Community support']}
                                isCurrentPlan={!isPro}
                            />
                            <PricingCard
                                title="Pro"
                                price="9.99"
                                features={[
                                    'All basic features',
                                    'Unlimited access',
                                    'Priority support',
                                    'Advanced analytics',
                                    'Custom integrations',
                                ]}
                                onSubscribe={() => handleSubscribe(import.meta.env.VITE_STRIPE_PRICE_ID || 'price_xxx')}
                                loading={loading}
                            />
                        </div>
                    </div>
                )}

                <div className="border border-black rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Features</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border border-gray-300 rounded">
                            <h3 className="font-bold mb-2">Basic Feature</h3>
                            <p className="text-sm text-gray-600">Available to all users</p>
                        </div>
                        <div className={`p-4 border rounded ${isPro ? 'border-black bg-gray-50' : 'border-gray-300 opacity-50'}`}>
                            <h3 className="font-bold mb-2">Pro Feature {!isPro && '🔒'}</h3>
                            <p className="text-sm text-gray-600">
                                {isPro ? 'You have access to this feature!' : 'Subscribe to Pro to unlock'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
