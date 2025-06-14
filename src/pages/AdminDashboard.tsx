
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, TrendingUp, Users, Settings, Clock, MapPin, Phone, ChevronRight } from 'lucide-react';

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
      const response = await fetch('/api/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Mock data for demo
      setDashboardData({
        totalAppointments: 1247,
        pendingAppointments: 23,
        completedAppointments: 1180,
        cancelledAppointments: 44,
      });
    }
  };

  const recentAppointments = [
    {
      id: 1,
      customer: 'Ahmed Al-Rashid',
      service: 'Eye Exam',
      time: '10:00 AM',
      date: 'Today',
      store: 'Riyadh Main',
      status: 'confirmed',
      phone: '+966501234567'
    },
    {
      id: 2,
      customer: 'Fatima Hassan',
      service: 'Contact Lens Fitting',
      time: '11:30 AM',
      date: 'Today',
      store: 'Jeddah Branch',
      status: 'pending',
      phone: '+966507654321'
    },
    {
      id: 3,
      customer: 'Mohammed Al-Zahrani',
      service: 'Frame Selection',
      time: '2:00 PM',
      date: 'Tomorrow',
      store: 'Dammam Branch',
      status: 'confirmed',
      phone: '+966501111222'
    }
  ];

  const quickActions = [
    {
      title: 'Manage Appointments',
      description: 'View and manage all appointments',
      href: '/admin/appointments',
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      title: 'User Management',
      description: 'Manage users and permissions',
      href: '/admin/users',
      icon: Users,
      color: 'from-emerald-500 to-green-500',
      bgColor: 'from-emerald-50 to-green-50'
    },
    {
      title: 'View Reports',
      description: 'Analytics and insights',
      href: '/admin/reports',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      title: 'Store Settings',
      description: 'Configure store settings',
      href: '/admin/stores',
      icon: Settings,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {t('dashboard.title')}
          </h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
        </div>
        <div className="text-sm text-gray-500 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-100">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      <DashboardStats data={dashboardData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Appointments */}
        <div className="lg:col-span-2">
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl shadow-gray-500/5">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-xl font-semibold text-gray-900">Recent Appointments</span>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 rounded-lg">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAppointments.map((appointment) => (
                  <div key={appointment.id} className="group p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{appointment.customer}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>{appointment.service} - {appointment.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span>{appointment.store}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span>{appointment.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{appointment.date}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl shadow-gray-500/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <Settings className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-xl font-semibold text-gray-900">Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <a
                      key={index}
                      href={action.href}
                      className="group p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl border border-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${action.bgColor} border border-white/20`}>
                          <Icon className={`h-5 w-5 bg-gradient-to-br ${action.color} bg-clip-text text-transparent`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
