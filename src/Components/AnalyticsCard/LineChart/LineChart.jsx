// ChartCard.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import chart.js
import "./style.css"

const ChartCard = ({ title, data, options }) => {
  return (
    <div className='ChartCard '>
      <h3 className='poppins poppins-large'>{title}</h3>
      <Line className='poppins' data={data} options={options} style={{width:"100%", height:"100%"}} />
    </div>
  );
};

export default ChartCard;
