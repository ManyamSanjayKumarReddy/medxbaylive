import { useEffect, useRef } from 'react';
import './Dashboard.css';
import { Chart } from 'chart.js/auto';
import { RiArrowDownSLine } from "react-icons/ri";

const YourIncome = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy the previous chart instance
    }

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Mar', 'Apr', 'Jun', 'Jul', 'Aug'],
        datasets: [
          {
            label: 'Income',
            data: [5000, 15000, 10000, 20000, 15000],
            backgroundColor: ['#007bff', '#007bff', '#007bff', '#FF5733', '#007bff'],
            borderRadius: 4,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allow the chart to resize freely
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => `$${context.raw.toLocaleString()}`,
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            title: {
              display: true,
            },
            ticks: {
              font: {
                size: 10,
                weight: '400', // Make the labels bold for better readability
              },
              color: '#272848', // Set the color of x-axis labels
              autoSkip: true,
              padding: 5, // Increase padding for more space
            },
          },
          y: {
            grid: {
              display: false,
            },
            title: {
              display: true,
            },
            ticks: {
              callback: (value) => `$${value / 1000}k`,
              font: {
                size: 10,
                weight: '400', // Make the labels bold for better readability
              },
              color: '#272848', // Set the color of y-axis labels
              autoSkip: false,
              padding: 0, // Increase padding for more space
              stepSize: 5000, // Set the step size to 5000 to get custom labels
            },
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Cleanup on component unmount
      }
    };
  }, []);

  return (
    <>
      <div className="income">
        <div className='dashboard-head-common'>
          <p>Your Income</p>
          <div className="select-container">
            <select className="select-box-common">
              <option>This month</option>
            </select>
            <RiArrowDownSLine className="arrow-icon-filter" />
          </div>
        </div>
      </div>
      <div className='chart-area'>
        <canvas ref={chartRef} id="incomeChart"></canvas>
      </div>
    </>
  );
}

export default YourIncome;
