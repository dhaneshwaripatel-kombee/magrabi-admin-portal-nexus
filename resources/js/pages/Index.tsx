import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
    const { user } = useAuth();

    if (user) {
        return (
            <Navigate
                to={
                    user.role === "admin"
                        ? "/admin/dashboard"
                        : "/store/dashboard"
                }
                replace
                data-test-id="role-based-redirect"
            />
        );
    }

    return <Navigate to="/login" replace data-test-id="login-redirect" />;
};

export default Index;
