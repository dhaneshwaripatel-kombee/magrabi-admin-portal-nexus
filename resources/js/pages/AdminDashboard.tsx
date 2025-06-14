import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import DashboardStats from "@/components/dashboard/DashboardStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, TrendingUp, Users, Settings } from "lucide-react";

const AdminDashboard = () => {
    const { user, token } = useAuth();
    const { t } = useLanguage();
    const [dashboardData, setDashboardData] = useState({
        totalAppointments: 0,
        pendingAppointments: 0,
        completedAppointments: 0,
        cancelledAppointments: 0,
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await fetch("/api/dashboard/stats", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setDashboardData(data);
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            // Mock data for demo
            setDashboardData({
                totalAppointments: 1247,
                pendingAppointments: 23,
                completedAppointments: 1180,
                cancelledAppointments: 44,
            });
        }
    };

    return (
        <div className="space-y-6" data-test-id="admin-dashboard">
            <div className="flex items-center justify-between">
                <h1
                    className="text-3xl font-bold text-gray-900"
                    data-test-id="dashboard-title"
                >
                    {t("dashboard.title")}
                </h1>
                <div
                    className="text-sm text-gray-500"
                    data-test-id="welcome-message"
                >
                    Welcome back, {user?.name}
                </div>
            </div>

            <DashboardStats data={dashboardData} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Appointments */}
                <Card data-test-id="recent-appointments-card">
                    <CardHeader>
                        <CardTitle
                            className="flex items-center space-x-2"
                            data-test-id="recent-appointments-title"
                        >
                            <Calendar className="h-5 w-5" />
                            <span>Recent Appointments</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div
                            className="space-y-4"
                            data-test-id="appointments-list"
                        >
                            <div
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                data-test-id="appointment-item-1"
                            >
                                <div>
                                    <p className="font-medium">
                                        Ahmed Al-Rashid
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Eye Exam - 10:00 AM
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">Today</p>
                                    <p className="text-xs text-gray-500">
                                        Riyadh Main
                                    </p>
                                </div>
                            </div>
                            <div
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                data-test-id="appointment-item-2"
                            >
                                <div>
                                    <p className="font-medium">Fatima Hassan</p>
                                    <p className="text-sm text-gray-600">
                                        Contact Lens - 11:30 AM
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">Today</p>
                                    <p className="text-xs text-gray-500">
                                        Jeddah Branch
                                    </p>
                                </div>
                            </div>
                            <div
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                data-test-id="appointment-item-3"
                            >
                                <div>
                                    <p className="font-medium">
                                        Mohammed Al-Zahrani
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Frame Selection - 2:00 PM
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">
                                        Tomorrow
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Dammam Branch
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card data-test-id="quick-actions-card">
                    <CardHeader>
                        <CardTitle
                            className="flex items-center space-x-2"
                            data-test-id="quick-actions-title"
                        >
                            <Settings className="h-5 w-5" />
                            <span>Quick Actions</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div
                            className="grid grid-cols-2 gap-4"
                            data-test-id="quick-actions-grid"
                        >
                            <a
                                href="/admin/appointments"
                                className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                data-test-id="manage-appointments-link"
                            >
                                <Calendar className="h-8 w-8 text-blue-600 mb-2" />
                                <span className="text-sm font-medium text-blue-900">
                                    Manage Appointments
                                </span>
                            </a>
                            <a
                                href="/admin/users"
                                className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                                data-test-id="user-management-link"
                            >
                                <Users className="h-8 w-8 text-green-600 mb-2" />
                                <span className="text-sm font-medium text-green-900">
                                    User Management
                                </span>
                            </a>
                            <a
                                href="/admin/reports"
                                className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                                data-test-id="view-reports-link"
                            >
                                <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
                                <span className="text-sm font-medium text-purple-900">
                                    View Reports
                                </span>
                            </a>
                            <a
                                href="/admin/stores"
                                className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                                data-test-id="store-settings-link"
                            >
                                <Settings className="h-8 w-8 text-orange-600 mb-2" />
                                <span className="text-sm font-medium text-orange-900">
                                    Store Settings
                                </span>
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
