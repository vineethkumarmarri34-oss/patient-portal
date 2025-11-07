import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const SessionDurationChart = ({ data }) => {
  const chartData = useMemo(() => {
    // Group by week_date and calculate average session duration
    const weeklyData = {};
    
    data.forEach(record => {
      if (!weeklyData[record.week_date]) {
        weeklyData[record.week_date] = { total: 0, count: 0 };
      }
      weeklyData[record.week_date].total += record.avg_session_minutes || 0;
      weeklyData[record.week_date].count += 1;
    });

    // Sort by date and calculate averages
    const sortedWeeks = Object.keys(weeklyData).sort();
    const labels = sortedWeeks.map(date => {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    const values = sortedWeeks.map(week => 
      (weeklyData[week].total / weeklyData[week].count).toFixed(1)
    );

    return {
      labels,
      datasets: [
        {
          label: 'Avg Session (minutes)',
          data: values,
          fill: true,
          borderColor: 'hsl(160, 65%, 45%)',
          backgroundColor: 'hsla(160, 65%, 45%, 0.1)',
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: 'hsl(160, 65%, 45%)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2
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
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Duration: ${context.parsed.y} minutes`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: function(value) {
            return value + 'm';
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    }
  };

  return <Line data={chartData} options={options} />;
};

export default SessionDurationChart;
