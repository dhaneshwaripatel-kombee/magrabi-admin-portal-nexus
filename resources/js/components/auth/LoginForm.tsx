import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LogIn } from "lucide-react";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login, isLoading } = useAuth();
    const { t, language, setLanguage, dir } = useLanguage();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await login(email, password);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed");
        }
    };

    return (
        <div
            className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 ${dir}`}
        >
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                        <LogIn className="h-8 w-8 text-blue-600" />
                        <CardTitle className="text-2xl font-bold text-center">
                            Magrabi Admin
                        </CardTitle>
                    </div>
                    <CardDescription className="text-center">
                        Sign in to access the admin portal
                    </CardDescription>

                    {/* Language Toggle */}
                    <div className="flex justify-center space-x-2">
                        <Button
                            variant={language === "en" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setLanguage("en")}
                        >
                            English
                        </Button>
                        <Button
                            variant={language === "ar" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setLanguage("ar")}
                        >
                            العربية
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        data-test-id="login-form"
                    >
                        {error && (
                            <Alert
                                variant="destructive"
                                data-test-id="login-error"
                            >
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email" data-test-id="email-label">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="admin@magrabi.com"
                                className="w-full"
                                data-test-id="email-input"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                data-test-id="password-label"
                            >
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                                className="w-full"
                                data-test-id="password-input"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                            data-test-id="login-submit-button"
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        <p>Demo Credentials:</p>
                        <p>Admin: admin@magrabi.com / admin123</p>
                        <p>Store Manager: store@magrabi.com / store123</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginForm;
