import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ArrowLeft, User, Calendar, Smartphone, Heart, Shield, TrendingUp } from 'lucide-react';
import PatientLoginChart from './charts/PatientLoginChart';
import PatientMessagesChart from './charts/PatientMessagesChart';
import PatientSatisfactionChart from './charts/PatientSatisfactionChart';

export const PatientViewer = ({ patient, onBack, userRole }) => {
  const isAdmin = userRole === 'admin';

  if (!isAdmin) {
    return (
      <Card className="border-2">
        <CardContent className="py-12 text-center">
          <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
          <p className="text-muted-foreground mb-4">
            Patient-level details are only available to administrators.
          </p>
          <Button onClick={onBack}>Back to Dashboard</Button>
        </CardContent>
      </Card>
    );
  }

  const getEngagementColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'high': return 'success';
      case 'medium': return 'warning';
      case 'low': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard Overview
      </Button>

      {/* Patient Summary Card */}
      <Card className="border-2 bg-gradient-to-br from-card to-accent-light">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl font-display mb-2">
                Patient Details
              </CardTitle>
              <Badge variant={getEngagementColor(patient.engagement_level)}>
                {patient.engagement_level} Engagement
              </Badge>
            </div>
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Info */}
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="text-lg font-semibold">{patient.patient_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Patient ID</p>
                <p className="font-mono font-semibold">{patient.patient_id}</p>
              </div>
            </div>

            {/* Demographics */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Age & Gender</p>
                  <p className="font-semibold">{patient.age} years • {patient.gender}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Device Type</p>
                  <p className="font-semibold">{patient.device_type}</p>
                </div>
              </div>
            </div>

            {/* Medical Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Chronic Condition</p>
                  <p className="font-semibold">{patient.chronic_condition || 'None'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Insurance</p>
                  <p className="font-semibold">{patient.insurance_type}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Enrollment Info */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Enrollment Date</p>
                <p className="font-semibold">{new Date(patient.enrollment_date).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-semibold">{patient.city}, {patient.state}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{patient.login_count}</p>
                <p className="text-sm text-muted-foreground">Logins</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{patient.secure_messages}</p>
                <p className="text-sm text-muted-foreground">Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{patient.appointments_scheduled}</p>
                <p className="text-sm text-muted-foreground">Appointments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{patient.avg_session_minutes}m</p>
                <p className="text-sm text-muted-foreground">Avg Session</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient-Specific Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Activity Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <PatientLoginChart patient={patient} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Communication & Refills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <PatientMessagesChart patient={patient} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 lg:col-span-2">
          <CardHeader>
            <CardTitle>Satisfaction Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-container" style={{ minHeight: '250px' }}>
              <PatientSatisfactionChart patient={patient} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientViewer;
