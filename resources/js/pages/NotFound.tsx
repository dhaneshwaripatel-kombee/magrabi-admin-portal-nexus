import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            location.pathname
        );
    }, [location.pathname]);

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen"
            data-test-id="not-found-page"
        >
            <h1
                className="text-4xl font-bold mb-4"
                data-test-id="not-found-title"
            >
                404
            </h1>
            <p className="text-xl mb-8" data-test-id="not-found-message">
                Page not found
            </p>
            <Button onClick={() => navigate("/")} data-test-id="go-home-button">
                Go Home
            </Button>
        </div>
    );
};

export default NotFound;
