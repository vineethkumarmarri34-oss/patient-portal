import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PatientSatisfactionChart = ({ patient }) => {
  const score = patient.satisfaction_score || 3;
  const maxScore = 5;
  const percentage = (score / maxScore) * 100;
  
  // Determine color based on score
  const getColor = (score) => {
    if (score >= 4) return 'hsl(160, 65%, 45%)';
    if (score >= 3) return 'hsl(25, 95%, 53%)';
    return 'hsl(0, 84%, 60%)';
  };

  const chartData = {
    labels: ['Score', 'Remaining'],
    datasets: [
      {
        data: [score, maxScore - score],
        backgroundColor: [
          getColor(score),
          'hsla(210, 40%, 94%, 0.5)'
        ],
        borderColor: [
          getColor(score),
          'hsla(210, 40%, 94%, 0.8)'
        ],
        borderWidth: 2
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
        },
        callbacks: {
          label: function(context) {
            if (context.dataIndex === 0) {
              return `Satisfaction: ${score.toFixed(1)} / ${maxScore}`;
            }
            return null;
          }
        }
      }
    },
    cutout: '75%'
  };

  return (
    <div className="relative h-full flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto">
        <Doughnut data={chartData} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-4xl font-bold font-display">{score.toFixed(1)}</p>
          <p className="text-sm text-muted-foreground">out of {maxScore}</p>
          <p className="text-xs text-muted-foreground mt-1">{percentage.toFixed(0)}% satisfied</p>
        </div>
      </div>
    </div>
  );
};

export default PatientSatisfactionChart;
