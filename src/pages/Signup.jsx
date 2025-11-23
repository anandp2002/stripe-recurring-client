import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import AuthLayout from '../components/templates/AuthLayout';
import FormField from '../components/molecules/FormField';
import Button from '../components/atoms/Button';
import Spinner from '../components/atoms/Spinner';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const token = await userCredential.user.getIdToken();

            // Sync user with backend
            await axios.post(`${import.meta.env.VITE_API_URL}/api/users/sync`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Sign Up">
            <form onSubmit={handleSubmit}>
                <FormField
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <FormField
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <FormField
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Spinner size="sm" /> : 'Sign Up'}
                </Button>
            </form>
            <p className="text-center mt-4 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="font-medium hover:underline">
                    Login
                </Link>
            </p>
        </AuthLayout>
    );
};

export default Signup;
