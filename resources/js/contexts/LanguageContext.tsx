
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.appointments': 'Appointments',
    'nav.stores': 'Stores',
    'nav.users': 'Users',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.total_appointments': 'Total Appointments',
    'dashboard.pending_appointments': 'Pending Appointments',
    'dashboard.completed_appointments': 'Completed Appointments',
    'dashboard.cancelled_appointments': 'Cancelled Appointments',
    
    // Appointments
    'appointments.title': 'Appointments Management',
    'appointments.search': 'Search appointments...',
    'appointments.customer_name': 'Customer Name',
    'appointments.phone': 'Phone',
    'appointments.date': 'Date',
    'appointments.time': 'Time',
    'appointments.status': 'Status',
    'appointments.actions': 'Actions',
    'appointments.reschedule': 'Reschedule',
    'appointments.cancel': 'Cancel',
    'appointments.complete': 'Mark Complete',
    
    // Status
    'status.pending': 'Pending',
    'status.confirmed': 'Confirmed',
    'status.completed': 'Completed',
    'status.cancelled': 'Cancelled',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.loading': 'Loading...',
    'common.search': 'Search',
    'common.filter': 'Filter',
  },
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.appointments': 'المواعيد',
    'nav.stores': 'المتاجر',
    'nav.users': 'المستخدمين',
    'nav.reports': 'التقارير',
    'nav.settings': 'الإعدادات',
    'nav.logout': 'تسجيل الخروج',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.total_appointments': 'إجمالي المواعيد',
    'dashboard.pending_appointments': 'المواعيد المعلقة',
    'dashboard.completed_appointments': 'المواعيد المكتملة',
    'dashboard.cancelled_appointments': 'المواعيد الملغية',
    
    // Appointments
    'appointments.title': 'إدارة المواعيد',
    'appointments.search': 'البحث في المواعيد...',
    'appointments.customer_name': 'اسم العميل',
    'appointments.phone': 'الهاتف',
    'appointments.date': 'التاريخ',
    'appointments.time': 'الوقت',
    'appointments.status': 'الحالة',
    'appointments.actions': 'الإجراءات',
    'appointments.reschedule': 'إعادة جدولة',
    'appointments.cancel': 'إلغاء',
    'appointments.complete': 'تحديد كمكتمل',
    
    // Status
    'status.pending': 'معلق',
    'status.confirmed': 'مؤكد',
    'status.completed': 'مكتمل',
    'status.cancelled': 'ملغي',
    
    // Common
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.view': 'عرض',
    'common.loading': 'جاري التحميل...',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
  },
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      dir: language === 'ar' ? 'rtl' : 'ltr'
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
