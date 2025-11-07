import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const RefillsChart = ({ data }) => {
  const chartData = useMemo(() => {
    const totalRefills = data.reduce((sum, record) => sum + (record.refill_requests || 0), 0);
    const totalAppointments = data.reduce((sum, record) => sum + (record.appointments_scheduled || 0), 0);
    const other = Math.max(0, totalAppointments - totalRefills);

    return {
      labels: ['Prescription Refills', 'Other Appointments'],
      datasets: [
        {
          data: [totalRefills, other],
          backgroundColor: [
            'hsla(187, 71%, 38%, 0.8)',
            'hsla(210, 40%, 94%, 0.8)'
          ],
          borderColor: [
            'hsl(187, 71%, 38%)',
            'hsl(210, 40%, 94%)'
          ],
          borderWidth: 2
        }
      ]
    };
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 13
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
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
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '60%'
  };

  return <Doughnut data={chartData} options={options} />;
};

export default RefillsChart;
