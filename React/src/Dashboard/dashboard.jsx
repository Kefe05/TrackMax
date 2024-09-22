// Dashboard Component
import React, { useState, useEffect } from 'react';
import LineChart from '../charts/line';
import { expense, tasks } from '../charts/data';
import { FaTasks } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Dashboard() {
  const [newValue, setNewValue] = useState({ username: 'Guest' });
  const [newChart, setNewChart] = useState({
    labels: [], // Initially empty arrays
    datasets: [
      {
        label: 'Expenses Tracker $',
        data: [],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        fill: true,
      },
    ],
  });

  // Update chart data on component mount
  useEffect(() => {
    setNewChart({
      labels: expense.map((data) => data.month),
      datasets: [
        {
          label: 'Expenses $',
          data: expense.map((data) => data.expense),
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          fill: true,
        },
      ],
    });
  }, []); // Empty dependency array to run only on mount

  useEffect(() => {
    fetch('http://localhost:5000/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    })
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        setNewValue(data[0]); // Assuming the first user is used for the dashboard
      } else {
        setNewValue({ username: 'Guest' }); // Fallback
      }
    })
    .catch(error => console.error('Error:', error));
  }, []);
  
  

  console.log(newValue)
  return (
    <div className="p-6 w-8/12 m-auto">
    <h2 className="font-bold text-3xl">Good Day, {newValue ? newValue.username : 'Chris'}</h2>
    <h3 className="text-2xl font-semibold">Overview</h3>
      <div className="w-full p-5 ">
        <LineChart data={newChart}  />
      </div>
      <Link to="/expense-tracker" className='bg-orange-900 text-orange-100 px-3 py-3 mt-5'>Go To Expense Tracker</Link>

      {/* Tasks Section */}
      <div className="p-tasks py-11 flex flex-col gap-7">
        <h2 className='text-center text-2xl font-bold'>Productivity Tracker</h2>
        {tasks.map((task) =>  
        <div key={task.id} className="task flex justify-between items-center">
            <div className="task_details flex items-center gap-3">
              <div className="task_icon"><FaTasks /> </div>
              <div className="task-ctn flex-col flex gap-2">
                <span className='font-semibold'>{task.name}</span>
                <span> {task.details}</span>
              </div>
            </div>
            <div className="task-date">Due on {task.dueDate}</div>
          </div>
        )}
        
      </div>

      <Link to="/productivity-tracker" className='bg-orange-900 text-orange-100 px-3 py-3'>Go To Productivity Tracker</Link>
    </div>
  );
}

export default Dashboard;