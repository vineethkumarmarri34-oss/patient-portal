import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Lock, TrendingUp, Users, Search } from 'lucide-react';
import LoginActivityChart from './charts/LoginActivityChart';
import NoShowRateChart from './charts/NoShowRateChart';
import SecureMessagesChart from './charts/SecureMessagesChart';
import RefillsChart from './charts/RefillsChart';
import SessionDurationChart from './charts/SessionDurationChart';
import PatientSearchPanel from './PatientSearchPanel';

export const ChartsSection = ({ data, userRole, onPatientSelect }) => {
  const isAdmin = userRole === 'admin';

  const chartConfigs = [
    {
      id: 'login',
      title: 'Login Activity',
      description: 'Average logins per week over time',
      icon: TrendingUp,
      component: LoginActivityChart,
      accessLevel: 'all'
    },
    {
      id: 'noshow',
      title: 'Appointment No-Show Rate',
      description: 'No-show rate by age group',
      icon: Users,
      component: NoShowRateChart,
      accessLevel: 'all'
    },
    {
      id: 'messages',
      title: 'Secure Messages',
      description: 'Messages grouped by device type',
      icon: Lock,
      component: SecureMessagesChart,
      accessLevel: 'admin'
    },
    {
      id: 'refills',
      title: 'Prescription Refills',
      description: 'Ratio of refills vs total appointments',
      icon: Lock,
      component: RefillsChart,
      accessLevel: 'admin'
    },
    {
      id: 'session',
      title: 'Session Duration Trend',
      description: 'Average session minutes over time',
      icon: Lock,
      component: SessionDurationChart,
      accessLevel: 'admin'
    }
  ];

  const accessibleCharts = chartConfigs.filter(
    chart => chart.accessLevel === 'all' || isAdmin
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Patient Search Panel - Admin only for detailed view */}
      {isAdmin && (
        <PatientSearchPanel data={data} onPatientSelect={onPatientSelect} />
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {accessibleCharts.map((config) => {
          const ChartComponent = config.component;
          const Icon = config.icon;
          
          return (
            <Card key={config.id} className="border-2">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-5 h-5 text-primary" />
                      <CardTitle className="text-xl">{config.title}</CardTitle>
                      {config.accessLevel === 'admin' && (
                        <Badge variant="secondary" className="text-xs">
                          Admin Only
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{config.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="chart-container">
                  <ChartComponent data={data} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Locked Charts for Non-Admin Users */}
      {!isAdmin && chartConfigs.filter(c => c.accessLevel === 'admin').length > 0 && (
        <Card className="border-2 border-dashed bg-muted/30">
          <CardContent className="py-12 text-center">
            <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Additional Charts Available</h3>
            <p className="text-muted-foreground">
              {chartConfigs.filter(c => c.accessLevel === 'admin').length} more charts available with administrator access
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChartsSection;
