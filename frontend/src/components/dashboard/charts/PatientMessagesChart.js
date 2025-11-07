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

export const PatientMessagesChart = ({ patient }) => {
  const chartData = {
    labels: ['Secure Messages', 'Refill Requests'],
    datasets: [
      {
        label: 'Count',
        data: [patient.secure_messages || 0, patient.refill_requests || 0],
        backgroundColor: [
          'hsla(210, 80%, 48%, 0.8)',
          'hsla(187, 71%, 38%, 0.8)'
        ],
        borderColor: [
          'hsl(210, 80%, 48%)',
          'hsl(187, 71%, 38%)'
        ],
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
          stepSize: 1
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default PatientMessagesChart;
