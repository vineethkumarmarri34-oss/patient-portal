import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Activity, MessageSquare, Calendar, Clock, TrendingUp } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export const KPISection = ({ data }) => {
  const [animatedValues, setAnimatedValues] = useState({
    avgLogins: 0,
    avgMessages: 0,
    avgNoShow: 0,
    avgSession: 0
  });

  // Calculate KPIs
  const calculateKPIs = () => {
    if (!data || data.length === 0) {
      return {
        avgLogins: 0,
        avgMessages: 0,
        avgNoShow: 0,
        avgSession: 0
      };
    }

    const totalLogins = data.reduce((sum, p) => sum + (p.login_count || 0), 0);
    const totalMessages = data.reduce((sum, p) => sum + (p.secure_messages || 0), 0);
    const totalNoShow = data.reduce((sum, p) => sum + (p.no_show_rate || 0), 0);
    const totalSession = data.reduce((sum, p) => sum + (p.avg_session_minutes || 0), 0);

    return {
      avgLogins: (totalLogins / data.length).toFixed(1),
      avgMessages: (totalMessages / data.length).toFixed(1),
      avgNoShow: (totalNoShow / data.length).toFixed(1),
      avgSession: (totalSession / data.length).toFixed(1)
    };
  };

  const kpis = calculateKPIs();

  // Animate counters on mount
  useEffect(() => {
    const duration = 1000; // 1 second
    const steps = 50;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedValues({
        avgLogins: (kpis.avgLogins * progress).toFixed(1),
        avgMessages: (kpis.avgMessages * progress).toFixed(1),
        avgNoShow: (kpis.avgNoShow * progress).toFixed(1),
        avgSession: (kpis.avgSession * progress).toFixed(1)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedValues(kpis);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [data]);

  const kpiCards = [
    {
      title: 'Avg Logins/Week',
      value: animatedValues.avgLogins,
      icon: Activity,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      tooltip: 'Average number of patient portal logins per week',
      trend: '+12.5%'
    },
    {
      title: 'Avg Secure Messages',
      value: animatedValues.avgMessages,
      icon: MessageSquare,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      tooltip: 'Average secure messages sent between patients and providers',
      trend: '+8.3%'
    },
    {
      title: 'Avg No-Show Rate',
      value: `${animatedValues.avgNoShow}%`,
      icon: Calendar,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      tooltip: 'Average percentage of missed appointments',
      trend: '-4.2%',
      isNegativeTrend: true
    },
    {
      title: 'Avg Session Duration',
      value: `${animatedValues.avgSession}m`,
      icon: Clock,
      color: 'text-success',
      bgColor: 'bg-success/10',
      tooltip: 'Average time patients spend on the portal per session',
      trend: '+15.7%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
      {kpiCards.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="kpi-card border-2 hover:border-primary/50 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          {kpi.title}
                        </p>
                        <h3 className="text-3xl font-bold font-display animate-count mb-2">
                          {kpi.value}
                        </h3>
                        <div className="flex items-center gap-1">
                          <TrendingUp className={`h-3 w-3 ${kpi.isNegativeTrend ? 'text-success rotate-180' : 'text-success'}`} />
                          <span className={`text-xs font-semibold ${kpi.isNegativeTrend ? 'text-success' : 'text-success'}`}>
                            {kpi.trend}
                          </span>
                          <span className="text-xs text-muted-foreground">vs last month</span>
                        </div>
                      </div>
                      <div className={`flex items-center justify-center w-12 h-12 ${kpi.bgColor} rounded-xl`}>
                        <Icon className={`w-6 h-6 ${kpi.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{kpi.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};

export default KPISection;
