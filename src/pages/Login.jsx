import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import AuthLayout from '../components/templates/AuthLayout';
import FormField from '../components/molecules/FormField';
import Button from '../components/atoms/Button';
import Spinner from '../components/atoms/Spinner';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Login">
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
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Spinner size="sm" /> : 'Login'}
                </Button>
            </form>
            <p className="text-center mt-4 text-sm">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium hover:underline">
                    Sign up
                </Link>
            </p>
        </AuthLayout>
    );
};

export default Login;
