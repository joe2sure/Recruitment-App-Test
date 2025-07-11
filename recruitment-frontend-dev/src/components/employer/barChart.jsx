import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const JobViewsBarChart = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Job Views',
        data: [100, 100, 100, 100, 100, 100, 100],
            backgroundColor: '#D9BFF9',
            borderColor: '#000000',          
            borderWidth: {
                top: 2,               
                left: 0,
                right: 0,
                bottom: 0,
            },
            borderSkipped: false,
            barThickness: 30,
        },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#000' },
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="p-5 max-w-fit max-h-fit">
      <h2 className="text-sm font-medium text-gray-600 mb-1">Job statistics</h2>
      <p className="text-lg font-bold">Job Views: 2,342</p>
      <p className="text-md text-gray-500 mt-2">Week <span className="text-purple-600">+5%</span></p>
      <div className="mt-4">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default JobViewsBarChart;
