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
const UserList = lazy(() => import("@/pages/users/UserList"));
const StoreList = lazy(() => import("@/pages/stores/StoreList"));
const RolesList = lazy(() => import("@/pages/settings/RolesList"));
const PermissionsList = lazy(() => import("@/pages/settings/PermissionsList"));

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
                path: "users",
                element: <UserList />,
            },
            {
                path: "stores",
                element: <StoreList />,
            },
            {
                path: "settings",
                children: [
                    {
                        path: "roles",
                        element: <RolesList />,
                    },
                    {
                        path: "permissions",
                        element: <PermissionsList />,
                    },
                ],
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
