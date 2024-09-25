import { useState, useEffect, useRef } from "react";
import Task from "../Task/task";
import BarChart from "../charts/bar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { tasksCompleted } from "../charts/data";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

function Productivity() {
  // Extend Day.js with the relativeTime plugin
  dayjs.extend(relativeTime);
  
  // Set the taskTime for today
  const taskTime = dayjs().format('dddd, MMMM D, YYYY');
  localStorage.setItem('taskTime', taskTime);
  
  // State hooks
  const navigate = useNavigate();
  const [completedValue, setCompletedValue] = useState([]);
  const format = useRef(localStorage.getItem('taskTime'));
  
  const [allTaskCompleted, setAllTaskCompleted] = useState([
    {
      id: 9,
      date: "Wednesday, September 25, 2024",
      taskCompleted: completedValue.length,
    }
  ]);

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

  const [completedTask, setCompletedTask] = useState({
    taskName: '',
    date: taskTime,
  });

  // Effect to set up chart data
  useEffect(() => {
    setNewChart({
      labels: tasksCompleted.map((data) => data.day),
      datasets: [
        {
          label: "Completed Task",
          data: allTaskCompleted.map((data) => data.taskCompleted),
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
          fill: true,
        },
      ],
    });
  }, [allTaskCompleted]);

  // Fetch tasks from the server
  useEffect(() => {
    axios.get("http://localhost:5000/productivity-tracker")
      .then((res) => {
        if (res.data.length > 0) {
          setTask(res.data);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  // Fetch completed tasks
  useEffect(() => {
    fetch('http://localhost:5000/completed-task', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    })
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        setCompletedValue(data);
        
        format.current = localStorage.getItem('taskTime');
        const lastTask = data[data.length - 1];
        if (lastTask.date === format.current) {
          // Use setAllTaskCompleted to update state
          setAllTaskCompleted(prevState => {
            const updatedState = [...prevState];
            updatedState[updatedState.length - 1] = {
              ...updatedState[updatedState.length - 1],
              taskCompleted: data.length
            };
            return updatedState;
          });
        }
      }
    })
    .catch(error => console.error('Error:', error));
  }, []);

  // Handle Task Deletion
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/deleteTask/${id}`)
      .then((res) => {
        setTask(prevTasks => prevTasks.filter(task => task.id !== id));
      })
      .catch((err) => console.log(err));
  };

  // Handle Edit Task
  const handleEdit = (id) => {
    handleDelete(id);
    navigate('/add-new-task');
  };

  // Handle marking a task as completed
  const handleCompleted = (id, name) => {
    const updatedTask = { ...completedTask, taskName: name };
    setCompletedTask(updatedTask);
  
    axios.post('http://localhost:5000/completed-task', updatedTask)
      .then(res => {
        console.log(res);
  
        fetch('http://localhost:5000/completed-task', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
        })
          .then(res => res.json())
          .then(data => {
            const today = localStorage.getItem('taskTime');
            const completedToday = data.filter(task => task.date === today);
  
            setAllTaskCompleted(prevState => {
              const updatedState = [...prevState];
              if (completedToday.length > 0) {
                updatedState[updatedState.length - 1] = {
                  ...updatedState[updatedState.length - 1],
                  taskCompleted: completedToday.length,
                };
              } else {
                updatedState.push({
                  id: updatedState.length + 1,
                  date: today,
                  taskCompleted: completedToday.length,
                });
              }
              return updatedState;
            });
          })
          .catch(error => console.error('Error fetching updated tasks:', error));
      })
      .catch(err => console.log(err));
  
    handleDelete(id);
  };
  

  return (
    <div className="p-5 w-[60%] m-auto">
      <h2 className="font-bold text-3xl p-2 rounded">Your Daily Task</h2>
      <div className="w-full p-6 border-2 mb-2">
        <BarChart data={newChart} />
      </div>
      <div className="flex flex-col gap-5">
        {task.map(({ id, name, details }) => (
          <Task
            key={id}
            name={name}
            detail={details}
            id={id}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleCompleted={handleCompleted}
          />
        ))}
      </div>
      <div className="flex justify-end p-11 gap-3">
        <Link to="/add-new-task" className="bg-orange-400 p-4 rounded-xl text-white">
          Add Task
        </Link>
        <button className="bg-orange-400 p-4 rounded-xl text-white">Shuffle</button>
      </div>
    </div>
  );
}

export default Productivity;
