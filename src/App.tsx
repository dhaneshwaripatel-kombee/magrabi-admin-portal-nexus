
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import AdminLayout from "@/components/layout/AdminLayout";
import LoginForm from "@/components/auth/LoginForm";
import AdminDashboard from "@/pages/AdminDashboard";
import AppointmentsPage from "@/pages/AppointmentsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ 
  children, 
  allowedRoles = [] 
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={
        user ? <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/store/dashboard'} replace /> : <LoginForm />
      } />
      
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="stores" element={<div>Stores Management (Coming Soon)</div>} />
        <Route path="users" element={<div>User Management (Coming Soon)</div>} />
        <Route path="reports" element={<div>Reports (Coming Soon)</div>} />
        <Route path="settings" element={<div>Settings (Coming Soon)</div>} />
      </Route>

      <Route path="/store" element={
        <ProtectedRoute allowedRoles={['store_manager']}>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="reports" element={<div>Store Reports (Coming Soon)</div>} />
        <Route path="settings" element={<div>Store Settings (Coming Soon)</div>} />
      </Route>

      <Route path="/" element={
        <Navigate to={user ? (user.role === 'admin' ? '/admin/dashboard' : '/store/dashboard') : '/login'} replace />
      } />
      
      <Route path="/unauthorized" element={
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
