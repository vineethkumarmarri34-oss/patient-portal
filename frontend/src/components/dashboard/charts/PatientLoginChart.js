import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const PatientLoginChart = ({ patient }) => {
  // Mock weekly data for individual patient
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const baseLogin = patient.login_count || 5;
  const loginData = weeks.map(() => 
    Math.max(0, baseLogin + Math.floor(Math.random() * 4 - 2))
  );

  const chartData = {
    labels: weeks,
    datasets: [
      {
        label: 'Logins',
        data: loginData,
        backgroundColor: 'hsla(187, 71%, 38%, 0.8)',
        borderColor: 'hsl(187, 71%, 38%)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: '600'
        },
        bodyFont: {
          size: 13
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          stepSize: 2
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default PatientLoginChart;
