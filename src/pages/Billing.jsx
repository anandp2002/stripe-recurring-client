import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { auth } from '../firebase';
import Navbar from '../components/organisms/Navbar';
import Spinner from '../components/atoms/Spinner';
import { Download, Calendar, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const Billing = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [invoices, setInvoices] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const token = await auth.currentUser.getIdToken();

                // Fetch user data for payment method
                const userResponse = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/users/sync`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (userResponse.data.cardLast4) {
                    setPaymentMethod({
                        last4: userResponse.data.cardLast4,
                        brand: userResponse.data.cardBrand || 'card',
                    });
                }

                // Fetch invoices
                const invoiceResponse = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/users/invoices`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setInvoices(invoiceResponse.data.invoices || []);
            } catch (error) {
                console.error('Error fetching billing data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, navigate]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatAmount = (amount) => {
        return `$${(amount / 100).toFixed(2)}`;
    };

    const getCardBrandName = (brand) => {
        const brands = {
            visa: 'Visa',
            mastercard: 'Mastercard',
            amex: 'American Express',
            discover: 'Discover',
        };
        return brands[brand?.toLowerCase()] || brand?.toUpperCase() || 'Card';
    };

    if (loading) {
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
                <h1 className="text-4xl font-bold mb-8">Billing & Invoices</h1>

                {/* Payment Method Section */}
                {paymentMethod && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 border border-black rounded-lg p-6"
                    >
                        <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gray-100 rounded-lg">
                                <CreditCard className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="font-medium text-lg">
                                    {getCardBrandName(paymentMethod.brand)} •••• {paymentMethod.last4}
                                </p>
                                <p className="text-sm text-gray-600">Default payment method</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Invoices Section */}
                <h2 className="text-2xl font-bold mb-4">Invoice History</h2>
                {invoices.length === 0 ? (
                    <div className="text-center py-12 border border-gray-300 rounded-lg">
                        <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-600">No invoices found</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {invoices.map((invoice, index) => (
                            <motion.div
                                key={invoice.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="border border-black rounded-lg p-6 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gray-100 rounded-lg">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">{formatAmount(invoice.amount)}</p>
                                        <p className="text-sm text-gray-600">{formatDate(invoice.date)}</p>
                                        {invoice.card && (
                                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                                <CreditCard className="w-3 h-3" />
                                                {getCardBrandName(invoice.card.brand)} •••• {invoice.card.last4}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${invoice.status === 'paid'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                    >
                                        {invoice.status}
                                    </span>
                                    <a
                                        href={invoice.invoice_pdf}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <Download className="w-5 h-5" />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Billing;
