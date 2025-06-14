
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, Clock, CheckCircle, XCircle, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsData {
  totalAppointments: number;
  pendingAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
}

interface DashboardStatsProps {
  data: StatsData;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ data }) => {
  const { t } = useLanguage();

  const stats = [
    {
      title: t('dashboard.total_appointments'),
      value: data.totalAppointments,
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      textColor: 'text-blue-700',
      change: '+12%',
      trending: 'up'
    },
    {
      title: t('dashboard.pending_appointments'),
      value: data.pendingAppointments,
      icon: Clock,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-50 to-orange-50',
      textColor: 'text-amber-700',
      change: '+5%',
      trending: 'up'
    },
    {
      title: t('dashboard.completed_appointments'),
      value: data.completedAppointments,
      icon: CheckCircle,
      color: 'from-emerald-500 to-green-500',
      bgColor: 'from-emerald-50 to-green-50',
      textColor: 'text-emerald-700',
      change: '+18%',
      trending: 'up'
    },
    {
      title: t('dashboard.cancelled_appointments'),
      value: data.cancelledAppointments,
      icon: XCircle,
      color: 'from-red-500 to-rose-500',
      bgColor: 'from-red-50 to-rose-50',
      textColor: 'text-red-700',
      change: '-3%',
      trending: 'down'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trending === 'up' ? TrendingUp : TrendingDown;
        return (
          <Card key={index} className="group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.bgColor} border border-white/20`}>
                  <Icon className={`h-6 w-6 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                </div>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  stat.trending === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  <TrendIcon className="h-3 w-3" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className={`text-3xl font-bold ${stat.textColor} mb-1`}>
                {stat.value.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500">vs last month</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;
