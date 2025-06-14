
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Bell, Filter, Download } from "lucide-react";

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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6" data-test-id="admin-dashboard">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-2" data-test-id="dashboard-title">
                            {t("dashboard.title")}
                        </h1>
                        <p className="text-gray-600 text-lg" data-test-id="welcome-message">
                            Welcome back, <span className="font-semibold text-gray-800">{user?.name}</span>
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white border-gray-200">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </Button>
                        <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white border-gray-200">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                            <Bell className="h-4 w-4 mr-2" />
                            Notifications
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <DashboardStats data={dashboardData} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Quick Actions */}
                <div className="lg:col-span-1">
                    <QuickActions />
                </div>

                {/* Right Column - Recent Activity */}
                <div className="lg:col-span-2">
                    <RecentActivity />
                </div>
            </div>

            {/* Today's Schedule Section */}
            <div className="mt-8">
                <Card className="group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between" data-test-id="todays-schedule-title">
                            <div className="flex items-center space-x-2 text-gray-800">
                                <Calendar className="h-5 w-5" />
                                <span>Today's Schedule</span>
                            </div>
                            <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white">
                                View All
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-test-id="appointments-grid">
                            {[
                                { time: "09:00 AM", patient: "Ahmed Al-Rashid", service: "Eye Exam", status: "confirmed", location: "Riyadh Main" },
                                { time: "10:30 AM", patient: "Fatima Hassan", service: "Contact Lens", status: "in-progress", location: "Jeddah Branch" },
                                { time: "02:00 PM", patient: "Mohammed Al-Zahrani", service: "Frame Selection", status: "upcoming", location: "Dammam Branch" }
                            ].map((appointment, index) => (
                                <div key={index} className="group/card p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300" data-test-id={`appointment-item-${index + 1}`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 group-hover/card:text-blue-900 transition-colors">
                                                {appointment.patient}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-1">{appointment.service}</p>
                                            <p className="text-xs text-gray-500">{appointment.location}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-blue-600">{appointment.time}</p>
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                                appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                appointment.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                                {appointment.status.replace('-', ' ')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
