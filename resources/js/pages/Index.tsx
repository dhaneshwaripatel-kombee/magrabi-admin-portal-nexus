
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/store/dashboard'} replace />;
  }
  
  return <Navigate to="/login" replace />;
};

export default Index;
