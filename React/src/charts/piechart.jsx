import React from 'react';
import { Pie } from 'react-chartjs-2';
import {Chart as Chartjs} from 'chart.js/auto'

function PieChart({ data}) {
  return <Pie data={data}  />;
}

export default PieChart;