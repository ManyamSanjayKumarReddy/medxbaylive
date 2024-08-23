import React, { useRef, useEffect } from 'react';
import './Dashboard.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { RiArrowDownSLine } from "react-icons/ri";

const BookingRate = ( {booking} ) => { 
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const chartRef = useRef(null);

    // Map the book data to days of the week
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const sortedBookData = booking?.sort((a, b) => a._id - b._id);
    const counts = sortedBookData.map(item => item.count);
  
    const totalCount = counts.reduce((acc, curr) => acc + curr, 0);
    const maxIndex = counts.indexOf(Math.max(...counts));

    const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const highestPercentage = ((counts[maxIndex] / totalCount) * 100).toFixed(2);
    const previousIndex = maxIndex === 0 ? 6 : maxIndex - 1;
    const previousPercentage = ((counts[previousIndex] / totalCount) * 100).toFixed(2);
    const increase = (highestPercentage - previousPercentage).toFixed(2);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;

      const gradientBlue = ctx.createLinearGradient(0, 0, 0, 300);
      gradientBlue.addColorStop(0, '#0041E7');
      gradientBlue.addColorStop(1, '#2A3F74');

      const gradientGreen = ctx.createLinearGradient(0, 0, 0, 400);
      gradientGreen.addColorStop(0, '#00A500');
      gradientGreen.addColorStop(1, '#008200');

      chart.data.datasets[0].backgroundColor = counts.map((_, index) =>
        index === maxIndex ? gradientGreen : gradientBlue
      );
      chart.update();
    }
  }, [counts, maxIndex]);


  
  const data = {
    labels: daysOfWeek,
    datasets: [
      {
        label: 'Booking Rate',
        data: counts,
        borderRadius: 3,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const percentage = ((context.raw / totalCount) * 100).toFixed(2);
            return `${percentage}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
            weight: 'bold',
          },
          color: '#A0AAC8',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
            weight: 'bold',
          },
          color: '#A0AAC8',
        },
      },
    },
  };

  return (
    <>
      <div className='booking-header'>
        <h2 className="booking-title">Booking Rate</h2>
        {/* <div className="select-container">
          <select className='recently'>
            <option>Recently</option>
            <option>This Month</option>
            <option>This Week</option>
            <option>This Year</option>
          </select>
          <RiArrowDownSLine className="arrow-icon-filter" />
        </div> */}
      </div>
      <div className="booking-area">
        <div className="rate">
          <h1 className="booking-number">{highestPercentage}%</h1>
          <p className='booking-description'>Your total<br /> patient on {labels[maxIndex]}</p>
          <p className="increase">Your booking rate is {increase}% increase than previous day</p>
        </div>
        <div className="chart">
          <Bar ref={chartRef} data={data} options={options} />
        </div>
      </div>
    </>
  );
}

export default BookingRate;
