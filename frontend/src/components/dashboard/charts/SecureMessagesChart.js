import React, { useMemo } from 'react';
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

export const SecureMessagesChart = ({ data }) => {
  const chartData = useMemo(() => {
    // Group by device_type
    const deviceData = {};
    
    data.forEach(record => {
      const device = record.device_type || 'Unknown';
      if (!deviceData[device]) {
        deviceData[device] = { messages: 0, count: 0 };
      }
      deviceData[device].messages += record.secure_messages || 0;
      deviceData[device].count += 1;
    });

    const labels = Object.keys(deviceData).sort();
    const avgMessages = labels.map(device => 
      (deviceData[device].messages / deviceData[device].count).toFixed(1)
    );

    return {
      labels,
      datasets: [
        {
          label: 'Avg Secure Messages',
          data: avgMessages,
          backgroundColor: [
            'hsla(187, 71%, 38%, 0.8)',
            'hsla(210, 80%, 48%, 0.8)',
            'hsla(160, 65%, 45%, 0.8)'
          ],
          borderColor: [
            'hsl(187, 71%, 38%)',
            'hsl(210, 80%, 48%)',
            'hsl(160, 65%, 45%)'
          ],
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false
        }
      ]
    };
  }, [data]);

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
        },
        callbacks: {
          label: function(context) {
            return `Avg Messages: ${context.parsed.y}`;
          }
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
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default SecureMessagesChart;
