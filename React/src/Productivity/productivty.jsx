import { useState, useEffect } from "react";
import Task from "../Task/task";
import BarChart from "../charts/bar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { tasksCompleted } from "../charts/data";

function Productivity() {
  const navigate = useNavigate();
  const [task, setTask] = useState([
    {
      id: 1,
      name: "Guest",
      details: "This is how to register a guest",
    },
  ]);
  
  const [newChart, setNewChart] = useState({
    labels: [],
    datasets: [
      {
        label: "Completed Task per day",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  });

  useEffect(() => {
    setNewChart({
      labels: tasksCompleted.map((data) => data.day),
      datasets: [
        {
          label: "Completed Task",
          data: tasksCompleted.map((data) => data.completed),
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
          fill: true,
        },
      ],
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/productivity-tracker")
      .then((res) => {
        if (res.data.length > 0) {
          setTask(res.data);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  // Handle Task Deletion
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/deleteTask/${id}`)
      .then((res) => {
        console.log(res);
        // Update the state to remove the deleted task
        setTask((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    handleDelete(id);
    navigate('/add-new-task')

  }

  return (
    <div className="p-5 w-8/12 m-auto">
      <h2 className="font-bold text-3xl p-2 rounded">Your Daily Task</h2>
      <div className="w-full p-6 border-2 mb-2">
        <BarChart data={newChart} />
      </div>
      <div className="flex flex-col gap-5">
        {task.map((task) => (
          <Task
            key={task.id}
            name={task.name}
            detail={task.details}
            id={task.id}
            handleDelete={handleDelete}
            handleEdit={handleEdit} // Pass the delete handler as a prop
          />
        ))}
      </div>
      <div className="flex justify-end p-11 gap-3">
        <Link
          to="/add-new-task"
          className="bg-orange-400 p-4 rounded-xl text-white"
        >
          Add Task
        </Link>
        <button className="bg-orange-400 p-4 rounded-xl text-white">Shuffle</button>
      </div>
    </div>
  );
}

export default Productivity;
