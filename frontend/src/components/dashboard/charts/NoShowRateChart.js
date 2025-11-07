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

export const NoShowRateChart = ({ data }) => {
  const chartData = useMemo(() => {
    // Group by age_group
    const ageGroupData = {};
    
    data.forEach(record => {
      const ageGroup = record.age_group || 'Unknown';
      if (!ageGroupData[ageGroup]) {
        ageGroupData[ageGroup] = { total: 0, count: 0 };
      }
      ageGroupData[ageGroup].total += record.no_show_rate || 0;
      ageGroupData[ageGroup].count += 1;
    });

    const labels = Object.keys(ageGroupData).sort();
    const values = labels.map(group => 
      (ageGroupData[group].total / ageGroupData[group].count).toFixed(1)
    );

    // Color gradient from success to warning
    const backgroundColors = labels.map((_, index) => {
      const ratio = index / (labels.length - 1);
      return `hsla(${160 - ratio * 135}, ${65 - ratio * 10}%, ${45 + ratio * 8}%, 0.8)`;
    });

    return {
      labels,
      datasets: [
        {
          label: 'No-Show Rate (%)',
          data: values,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(color => color.replace('0.8', '1')),
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
            return `No-Show Rate: ${context.parsed.y}%`;
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
        },
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default NoShowRateChart;
