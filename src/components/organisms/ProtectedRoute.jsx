import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requiresPro = false }) => {
    const { user, loading } = useSelector((state) => state.auth);
    const { isPro } = useSelector((state) => state.subscription);

    if (loading) {
        return null;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requiresPro && !isPro) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default ProtectedRoute;
