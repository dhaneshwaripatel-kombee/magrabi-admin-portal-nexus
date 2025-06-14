import React, { useState } from "react";
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
import { Mail } from "lucide-react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess(false);

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
            } else {
                throw new Error(data.message || "Failed to send reset email");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                        <Mail className="h-8 w-8 text-blue-600" />
                        <CardTitle className="text-2xl font-bold text-center">
                            Forgot Password
                        </CardTitle>
                    </div>
                    <CardDescription className="text-center">
                        Enter your email address and we'll send you a link to
                        reset your password
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        data-test-id="forgot-password-form"
                    >
                        {error && (
                            <Alert
                                variant="destructive"
                                data-test-id="forgot-password-error"
                            >
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {success && (
                            <Alert data-test-id="forgot-password-success">
                                <AlertDescription>
                                    Password reset link has been sent to your
                                    email
                                </AlertDescription>
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
                                placeholder="Enter your email"
                                className="w-full"
                                data-test-id="email-input"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                            data-test-id="submit-button"
                        >
                            {isLoading ? "Sending..." : "Send Reset Link"}
                        </Button>

                        <div className="text-center">
                            <a
                                href="/login"
                                className="text-sm text-blue-600 hover:underline"
                                data-test-id="back-to-login"
                            >
                                Back to Login
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ForgotPassword;
