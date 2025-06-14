import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Suspense } from "react";
import { routes } from "@/routes";

const queryClient = new QueryClient();

const AppRoutes = () => {
    const { user } = useAuth();

    return (
        <Routes>
            {/* Redirect root based on auth status */}
            <Route
                path="/"
                element={
                    <Navigate
                        to={
                            user
                                ? user.role === "admin"
                                    ? "/admin/dashboard"
                                    : "/store/dashboard"
                                : "/login"
                        }
                        replace
                    />
                }
            />

            {/* Render all other routes */}
            {routes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <Suspense
                            fallback={
                                <div className="flex items-center justify-center h-screen">
                                    <div className="text-lg">Loading...</div>
                                </div>
                            }
                        >
                            {route.element}
                        </Suspense>
                    }
                >
                    {route.children?.map((child) => (
                        <Route
                            key={child.path}
                            path={child.path}
                            element={
                                <Suspense
                                    fallback={
                                        <div className="flex items-center justify-center h-screen">
                                            <div className="text-lg">
                                                Loading...
                                            </div>
                                        </div>
                                    }
                                >
                                    {child.element}
                                </Suspense>
                            }
                        />
                    ))}
                </Route>
            ))}
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
