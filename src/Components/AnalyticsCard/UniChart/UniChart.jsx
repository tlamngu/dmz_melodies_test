// UniversalChart.js
import React from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import chart.js
import "./style.css"
const UniversalChart = ({ chartType, title, data, options }) => {
  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return <Line data={data} options={options} />;
      case 'pie':
        return <Pie data={data} options={options} />;
      case 'bar':
        return <Bar data={data} options={options} />;
      default:
        return <div>Invalid chart type</div>;
    }
  };

  return (
    <div className="chart-card">
      <h2 className='poppins poppins-larger'>{title}</h2>
      <div className="chart-wrapper">
        {renderChart()}
      </div>
    </div>
  );
};

export default UniversalChart;
