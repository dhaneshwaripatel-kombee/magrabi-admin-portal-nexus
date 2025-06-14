
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Search, Calendar, Clock, Phone, User } from 'lucide-react';

interface Appointment {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  service_type: string;
  store_name: string;
  notes?: string;
}

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();
  const { token } = useAuth();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments || []);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      // Mock data for demo
      setAppointments([
        {
          id: 1,
          customer_name: 'Ahmed Al-Rashid',
          customer_phone: '+966501234567',
          customer_email: 'ahmed@example.com',
          appointment_date: '2024-06-15',
          appointment_time: '10:00',
          status: 'pending',
          service_type: 'Eye Exam',
          store_name: 'Riyadh Main Branch',
          notes: 'First time customer'
        },
        {
          id: 2,
          customer_name: 'Fatima Hassan',
          customer_phone: '+966507654321',
          customer_email: 'fatima@example.com',
          appointment_date: '2024-06-15',
          appointment_time: '11:30',
          status: 'confirmed',
          service_type: 'Contact Lens Fitting',
          store_name: 'Jeddah Branch',
        },
        {
          id: 3,
          customer_name: 'Mohammed Al-Zahrani',
          customer_phone: '+966501111222',
          customer_email: 'mohammed@example.com',
          appointment_date: '2024-06-14',
          appointment_time: '14:00',
          status: 'completed',
          service_type: 'Frame Selection',
          store_name: 'Dammam Branch',
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (appointmentId: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setAppointments(prev => 
          prev.map(apt => 
            apt.id === appointmentId 
              ? { ...apt, status: newStatus as any }
              : apt
          )
        );
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: t('status.pending'), variant: 'secondary' as const },
      confirmed: { label: t('status.confirmed'), variant: 'default' as const },
      completed: { label: t('status.completed'), variant: 'default' as const },
      cancelled: { label: t('status.cancelled'), variant: 'destructive' as const },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.customer_phone.includes(searchTerm) ||
                         appointment.store_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>{t('appointments.title')}</span>
        </CardTitle>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t('appointments.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('appointments.customer_name')}</TableHead>
                <TableHead>{t('appointments.phone')}</TableHead>
                <TableHead>{t('appointments.date')}</TableHead>
                <TableHead>{t('appointments.time')}</TableHead>
                <TableHead>{t('appointments.status')}</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>{t('appointments.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>{appointment.customer_name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{appointment.customer_phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>{appointment.appointment_date}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{appointment.appointment_time}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell>{appointment.service_type}</TableCell>
                  <TableCell>{appointment.store_name}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {appointment.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                        >
                          Confirm
                        </Button>
                      )}
                      {appointment.status === 'confirmed' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(appointment.id, 'completed')}
                        >
                          {t('appointments.complete')}
                        </Button>
                      )}
                      {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                        >
                          {t('appointments.cancel')}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentsList;
