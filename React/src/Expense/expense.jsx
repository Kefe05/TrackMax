import { useState, useEffect } from "react";
import { expense as expenseDataList, expenseData,pendingExpenseData } from '../charts/data';
import BarChart from "../charts/bar";
import PieChart from "../charts/piechart";
import Task from "../Task/task";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Expense(){
  const [expense, setExpense] = useState([{
    id: 1,
    category: 'Rent',
    amountSpent: 1200,
  }])

  const navigate = useNavigate();
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
      labels: expenseDataList.map((data) => data.month),
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

  useEffect(() => {
    axios.get("http://localhost:5000/expense-tracker")
      .then((res) => {
        if (res.data.length > 0) {
          setExpense(res.data);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/deleteExpense/${id}`)
      .then((res) => {
        console.log(res);
        // Update the state to remove the deleted task
        setExpense((prevTasks) => prevTasks.filter((expense) => expense.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) =>{
    handleDelete(id);
    navigate('/add-new-expense')
  }
  

  // Update chart data on component mount
   // Empty dependency array to run only on mount

  return(
    <div className="p-5 w-8/12 h-screen m-auto bg-white">
      <h2 className="font-bold text-3xl">Daily Expense</h2>
      <div className="w-full">
        <div className="w-8/12 p-5 m-auto">
          <PieChart data={pieData}/>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {
          expense.map((data) => (
            <Task 
            key={data.id}
            id={data.id}
             name={data.category} 
             detail={data.amount}
             handleDelete={handleDelete}
             handleEdit={handleEdit} />
          ))
        }
      </div>
      <div className=" flex justify-end">
      <Link
        to="/add-new-expense"
        className="bg-orange-400 p-4 mt-5 rounded-xl text-white"
        >
          Add Expense
        </Link>
      </div>

    </div>
  )
}

export default Expense