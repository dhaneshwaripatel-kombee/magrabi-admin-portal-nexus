
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Menu, 
  Home, 
  Calendar, 
  Users, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Store
} from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const { t, language, setLanguage, dir } = useLanguage();
  const location = useLocation();

  const navigation = [
    { name: t('nav.dashboard'), href: '/admin/dashboard', icon: Home },
    { name: t('nav.appointments'), href: '/admin/appointments', icon: Calendar },
    { name: t('nav.stores'), href: '/admin/stores', icon: Store },
    { name: t('nav.users'), href: '/admin/users', icon: Users },
    { name: t('nav.reports'), href: '/admin/reports', icon: BarChart3 },
    { name: t('nav.settings'), href: '/admin/settings', icon: Settings },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className={`flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${dir === 'rtl' ? 'rtl' : 'ltr'}`}>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-20'} transition-all duration-300 ease-in-out relative`}>
        <div className="h-full bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className={`${!sidebarOpen && 'hidden'} flex items-center space-x-3`}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Magrabi
                </h1>
                <p className="text-xs text-gray-500">Admin Portal</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-blue-50 rounded-xl transition-colors"
            >
              {sidebarOpen ? (
                dir === 'rtl' ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          <nav className="mt-8 px-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 mb-2 text-sm font-medium rounded-xl transition-all duration-200 group ${
                    active
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  <Icon className={`h-5 w-5 flex-shrink-0 ${active ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`} />
                  <span className={`${!sidebarOpen && 'hidden'} ml-3 transition-all duration-200`}>
                    {item.name}
                  </span>
                  {active && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full opacity-80"></div>
                  )}
                </a>
              );
            })}
          </nav>

          {/* User Profile Section */}
          <div className={`absolute bottom-6 left-4 right-4 ${!sidebarOpen && 'hidden'}`}>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
          <div className="flex items-center justify-between px-8 py-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {user?.role === 'admin' ? 'System Administration' : 'Store Management'}
              </h1>
            </div>

            <div className="flex items-center space-x-6">
              {/* Language Toggle */}
              <div className="flex items-center space-x-1 bg-gray-50 rounded-xl p-1">
                <Button
                  variant={language === 'en' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLanguage('en')}
                  className={`rounded-lg ${language === 'en' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
                >
                  EN
                </Button>
                <Button
                  variant={language === 'ar' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLanguage('ar')}
                  className={`rounded-lg ${language === 'ar' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
                >
                  AR
                </Button>
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="ml-2">{t('nav.logout')}</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-transparent">
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
