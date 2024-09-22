// LineChart Component
import React from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as Chartjs} from 'chart.js/auto'

function LineChart({ data }) {
  return <Line data={data} />;
}

export default LineChart;