import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProFeatures from './pages/ProFeatures';
import Billing from './pages/Billing';
import Spinner from './components/atoms/Spinner';
import { useSelector } from 'react-redux';

function App() {
  useAuth();
  const { loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pro-features" element={<ProFeatures />} />
      <Route path="/billing" element={<Billing />} />
    </Routes>
  );
}

export default App;
