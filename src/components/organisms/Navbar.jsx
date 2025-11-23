import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { logout } from '../../store/authSlice';
import Button from '../atoms/Button';

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const { isPro } = useSelector((state) => state.subscription);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="border-b border-black bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/dashboard" className="text-2xl font-bold">
                        SubApp
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link to="/pro-features" className="hover:underline">
                            Pro Features
                        </Link>
                        <Link to="/billing" className="hover:underline">
                            Billing
                        </Link>
                        {isPro && (
                            <span className="px-3 py-1 bg-black text-white text-sm font-medium rounded-full">
                                PRO
                            </span>
                        )}
                        {user && (
                            <Button variant="secondary" onClick={handleLogout}>
                                Logout
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
