import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import KPISection from '../components/dashboard/KPISection';
import FiltersPanel from '../components/dashboard/FiltersPanel';
import ChartsSection from '../components/dashboard/ChartsSection';
import PatientViewer from '../components/dashboard/PatientViewer';
import { generateMockData } from '../utils/mockDataGenerator';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [patientData, setPatientData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    ageGroup: 'all',
    gender: 'all',
    deviceType: 'all'
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));

    // Load patient data
    loadPatientData();
  }, [navigate]);

  const loadPatientData = async () => {
    setIsLoading(true);
    try {
      // Try to load from JSON file first
      const response = await fetch('/patient_portal_dataset_1000.json');
      let data = [];
      
      if (response.ok) {
        const jsonData = await response.json();
        data = jsonData.length > 0 ? jsonData : generateMockData(1000);
      } else {
        // Generate mock data if file not found
        data = generateMockData(1000);
      }
      
      setPatientData(data);
      setFilteredData(data);
    } catch (error) {
      console.error('Error loading data:', error);
      // Generate mock data on error
      const data = generateMockData(1000);
      setPatientData(data);
      setFilteredData(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Apply filters
    let filtered = [...patientData];

    if (filters.ageGroup !== 'all') {
      filtered = filtered.filter(p => p.age_group === filters.ageGroup);
    }

    if (filters.gender !== 'all') {
      filtered = filtered.filter(p => p.gender.toLowerCase() === filters.gender.toLowerCase());
    }

    if (filters.deviceType !== 'all') {
      filtered = filtered.filter(p => p.device_type === filters.deviceType);
    }

    setFilteredData(filtered);
  }, [filters, patientData]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      ageGroup: 'all',
      gender: 'all',
      deviceType: 'all'
    });
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  const handleBackToDashboard = () => {
    setSelectedPatient(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-lg text-muted-foreground">Loading patient data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {selectedPatient ? (
          <PatientViewer 
            patient={selectedPatient} 
            onBack={handleBackToDashboard}
            userRole={user?.role}
          />
        ) : (
          <>
            <KPISection data={filteredData} />
            
            <FiltersPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
              data={patientData}
            />
            
            <ChartsSection 
              data={filteredData} 
              userRole={user?.role}
              onPatientSelect={handlePatientSelect}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
