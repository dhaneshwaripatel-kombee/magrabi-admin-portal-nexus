
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, TrendingUp, Settings, Plus, Eye, BarChart3 } from 'lucide-react';

const QuickActions = () => {
    const actions = [
        {
            title: "New Appointment",
            description: "Book appointment for walk-in",
            icon: Plus,
            href: "/admin/appointments/new",
            color: "from-emerald-500 to-green-500",
            bgColor: "from-emerald-50 to-green-50",
            hoverColor: "hover:from-emerald-100 hover:to-green-100"
        },
        {
            title: "View Calendar",
            description: "Check today's schedule",
            icon: Calendar,
            href: "/admin/appointments",
            color: "from-blue-500 to-cyan-500",
            bgColor: "from-blue-50 to-cyan-50",
            hoverColor: "hover:from-blue-100 hover:to-cyan-100"
        },
        {
            title: "User Management",
            description: "Manage staff & customers",
            icon: Users,
            href: "/admin/users",
            color: "from-purple-500 to-violet-500",
            bgColor: "from-purple-50 to-violet-50",
            hoverColor: "hover:from-purple-100 hover:to-violet-100"
        },
        {
            title: "Reports",
            description: "Analytics & insights",
            icon: BarChart3,
            href: "/admin/reports",
            color: "from-orange-500 to-red-500",
            bgColor: "from-orange-50 to-red-50",
            hoverColor: "hover:from-orange-100 hover:to-red-100"
        }
    ];

    return (
        <Card className="group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Settings className="h-5 w-5" />
                    <span>Quick Actions</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    {actions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <a
                                key={index}
                                href={action.href}
                                className={`group/action relative overflow-hidden rounded-2xl bg-gradient-to-br ${action.bgColor} ${action.hoverColor} p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/20`}
                            >
                                <div className="flex flex-col items-center text-center space-y-3">
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} shadow-lg group-hover/action:scale-110 transition-transform duration-300`}>
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 group-hover/action:text-gray-900">
                                            {action.title}
                                        </h3>
                                        <p className="text-xs text-gray-600 mt-1">
                                            {action.description}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Hover effect overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/action:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                            </a>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default QuickActions;
