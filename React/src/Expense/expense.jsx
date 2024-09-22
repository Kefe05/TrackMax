import { useState, useEffect } from "react";
import { expense, expenseData,pendingExpenseData } from '../charts/data';
import BarChart from "../charts/bar";
import PieChart from "../charts/piechart";
import Task from "../Task/task";

function Expense(){
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
    options: {
      indexAxis: 'y',
    }
  });
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
      options: {
        indexAxis: 'y',
      }
    });
  }, []);

  const [pieData, setpieData] = useState({
    labels: [], // Initially empty arrays
    datasets: [
      {
        label: 'Expenses Distribution $',
        data: [],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        fill: true,
      },
    ],
    options: {
      indexAxis: 'y',
    }
  });

  useEffect(() => {
    setpieData({
      labels: expenseData.map((data) => data.category),
      datasets: [
        {
          label: 'Expenses $',
          data: expenseData.map((data) => data.amountSpent),
          backgroundColor: ['rgba(75,192,192,0.2)','purple','green', 'red', 'blue','yellow', 'orange', 'gray'],
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          fill: true,
        },
      ],
      options: {
        indexAxis: 'y',
      }
    });
  }, []);

 

  // Update chart data on component mount
   // Empty dependency array to run only on mount

  return(
    <div className="p-5 w-8/12 m-auto bg-white">
      <h2 className="font-bold text-3xl">Daily Expense</h2>
      <div className="w-full">
        {/* <div className="w-full p-5 ">
          <BarChart data={newChart}/>
        </div> */}
        <div className="w-8/12 p-5 m-auto">

          <PieChart data={pieData}/>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {
          pendingExpenseData.map((data, index) => (
            <Task key={index} name={data.category} detail={data.amountDue} />
          ))
        }
      </div>
    </div>
  )
}

export default Expense