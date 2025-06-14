import { RouteObject } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";

// Lazy load pages for better performance
const LoginForm = lazy(() => import("@/components/auth/LoginForm"));
const ForgotPassword = lazy(() => import("@/components/auth/ForgotPassword"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const AppointmentsPage = lazy(() => import("@/pages/AppointmentsPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Auth routes
export const authRoutes: RouteObject[] = [
    {
        path: "/login",
        element: <LoginForm />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
    },
];

// Admin routes
export const adminRoutes: RouteObject[] = [
    {
        path: "/admin",
        element: (
            <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "dashboard",
                element: <AdminDashboard />,
            },
            {
                path: "appointments",
                element: <AppointmentsPage />,
            },
            {
                path: "stores",
                element: <div>Stores Management (Coming Soon)</div>,
            },
            {
                path: "users",
                element: <div>User Management (Coming Soon)</div>,
            },
            {
                path: "reports",
                element: <div>Reports (Coming Soon)</div>,
            },
            {
                path: "settings",
                element: <div>Settings (Coming Soon)</div>,
            },
        ],
    },
];

// Store routes
export const storeRoutes: RouteObject[] = [
    {
        path: "/store",
        element: (
            <ProtectedRoute allowedRoles={["store_manager"]}>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "dashboard",
                element: <AdminDashboard />,
            },
            {
                path: "appointments",
                element: <AppointmentsPage />,
            },
            {
                path: "reports",
                element: <div>Store Reports (Coming Soon)</div>,
            },
            {
                path: "settings",
                element: <div>Store Settings (Coming Soon)</div>,
            },
        ],
    },
];

// Public routes
export const publicRoutes: RouteObject[] = [
    {
        path: "/unauthorized",
        element: (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">
                        Unauthorized Access
                    </h1>
                    <p className="text-gray-600">
                        You don't have permission to access this page.
                    </p>
                </div>
            </div>
        ),
    },
    {
        path: "*",
        element: <NotFound />,
    },
];

// Combine all routes
export const routes: RouteObject[] = [
    ...authRoutes,
    ...adminRoutes,
    ...storeRoutes,
    ...publicRoutes,
];
