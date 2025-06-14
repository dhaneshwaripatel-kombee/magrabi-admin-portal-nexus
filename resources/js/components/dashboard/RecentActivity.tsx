
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle, XCircle, User, MapPin } from 'lucide-react';

const RecentActivity = () => {
    const activities = [
        {
            id: 1,
            type: 'appointment',
            title: 'New Appointment Booked',
            description: 'Ahmed Al-Rashid - Eye Exam',
            time: '2 minutes ago',
            status: 'confirmed',
            location: 'Riyadh Main',
            icon: Calendar,
            color: 'text-blue-600'
        },
        {
            id: 2,
            type: 'appointment',
            title: 'Appointment Completed',
            description: 'Fatima Hassan - Contact Lens Fitting',
            time: '15 minutes ago',
            status: 'completed',
            location: 'Jeddah Branch',
            icon: CheckCircle,
            color: 'text-green-600'
        },
        {
            id: 3,
            type: 'appointment',
            title: 'Appointment Cancelled',
            description: 'Mohammed Al-Zahrani - Frame Selection',
            time: '1 hour ago',
            status: 'cancelled',
            location: 'Dammam Branch',
            icon: XCircle,
            color: 'text-red-600'
        },
        {
            id: 4,
            type: 'user',
            title: 'New Staff Member Added',
            description: 'Dr. Sarah Abdullah - Optometrist',
            time: '2 hours ago',
            status: 'active',
            location: 'Riyadh Main',
            icon: User,
            color: 'text-purple-600'
        }
    ];

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            confirmed: { variant: 'default', text: 'Confirmed' },
            completed: { variant: 'default', text: 'Completed' },
            cancelled: { variant: 'destructive', text: 'Cancelled' },
            active: { variant: 'default', text: 'Active' }
        };
        
        const config = statusConfig[status as keyof typeof statusConfig] || { variant: 'default', text: status };
        return (
            <Badge variant={config.variant as any} className="text-xs">
                {config.text}
            </Badge>
        );
    };

    return (
        <Card className="group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Clock className="h-5 w-5" />
                    <span>Recent Activity</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                    {activities.map((activity) => {
                        const Icon = activity.icon;
                        return (
                            <div
                                key={activity.id}
                                className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group/item border border-transparent hover:border-blue-100"
                            >
                                <div className={`p-2 rounded-lg bg-white shadow-sm group-hover/item:shadow-md transition-shadow duration-300`}>
                                    <Icon className={`h-4 w-4 ${activity.color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-sm font-medium text-gray-900 group-hover/item:text-gray-800">
                                            {activity.title}
                                        </p>
                                        {getStatusBadge(activity.status)}
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        {activity.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                                            <MapPin className="h-3 w-3" />
                                            <span>{activity.location}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {activity.time}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default RecentActivity;
