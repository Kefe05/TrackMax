import { useState, useEffect, useRef } from "react";
import Task from "../Task/task";
import BarChart from "../charts/bar";
import { Link, useNavigate } from "react-router-dom";
import axios, { all } from "axios";
import { tasksCompleted } from "../charts/data";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

function Productivity() {
  // Set taskTime for today dynamically
  
  let [no,setNo] = useState(0);
  let [no1,setNo1]  = useState(0);
  let[no2, setNo2] = useState(0);
  // State hooks
  const navigate = useNavigate();
  const [completedValue, setCompletedValue] = useState([]);
  const format = useRef(localStorage.getItem('taskTime'));
  
  const [allTaskCompleted, setAllTaskCompleted] = useState([]);

  class newTask{
    constructor(date, no){
      this.date = date,
      this.no = no
    }
  }
  


  


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
    date: dayjs().format('dddd, MMM D, yyyy'),
  });

  // Abstracted function to fetch completed tasks
  const fetchCompletedTasks = () => {
    return fetch('http://localhost:5000/completed-task', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    }).then(res => res.json());
  };

  // Effect to set up chart data
  useEffect(() => {
    setNewChart({
      labels: allTaskCompleted.map((task) => task.date), // Use date from completed tasks
      datasets: [
        {
          label: "Completed Task per day",
          data: allTaskCompleted.map((task) => task.no), // Use task completion count
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
          fill: true,
        },
      ],
    });
  }, [allTaskCompleted]); // This will update the chart data whenever allTaskCompleted changes
  

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
    fetchCompletedTasks()
      .then(data => {
        if (data.length > 0) {
          setCompletedValue(data);
        }
  
        const list1 = []
        const list2 = []
        const list3 = []
     
        data.forEach((task) => {
          if(dayjs(task.date, 'dddd, MMM D, YYYY').isSame(dayjs().subtract(2, 'day'), 'day')){
            list1.push(task);
          } else if(dayjs(task.date, 'dddd, MMM D, YYYY').isSame(dayjs().subtract(1, 'day'), 'day')){
            list2.push(task);
          } else {
            list3.push(task);
          }
        });
  
        const newTask1 = new newTask(dayjs().subtract(2,'day').format('dddd, MMM D, YYYY'), list1.length);
        const newTask2 = new newTask(dayjs().subtract(1,'day').format('dddd, MMM D, YYYY'), list2.length);
        const newTask3 = new newTask(dayjs().format('dddd, MMM D, YYYY'), list3.length);
  
        setAllTaskCompleted([ newTask1, newTask2, newTask3]);
      })
      .catch(error => console.error('Error:', error));
  }, []);
  
  localStorage.setItem('items', allTaskCompleted)
  

  // Handle Task Deletion
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/deleteTask/${id}`)
      .then((res) => {
        setTask(prevTasks => prevTasks.filter(task => task.id !== id));
      })
      .catch((err) => console.log(err));
  };

  // Handle marking a task as completed
  const handleCompleted = (id, name) => {
    const updatedTask = { ...completedTask, taskName: name };
    setCompletedTask(updatedTask);

    axios.post('http://localhost:5000/completed-task', updatedTask)
      .then(res => {
        fetchCompletedTasks()
          .then(data => {
            const today = localStorage.getItem('taskTime');
            const completedToday = data.filter(task => task.date === today);

            const list1 = []
        const list2 = []
        const list3 = []
     
        completedValue.forEach((task) => {
          if(dayjs(task.date, 'dddd, MMM D, YYYY').isSame(dayjs().subtract(2, 'day'), 'day')){
            list1.push(task);
          } else if(dayjs(task.date, 'dddd, MMM D, YYYY').isSame(dayjs().subtract(1, 'day'), 'day')){
            list2.push(task);
          } else {
            list3.push(task);
          }
        });
  
        const newTask1 = new newTask(dayjs().subtract(2,'day').format('dddd, MMM D, YYYY'), list1.length);
        const newTask2 = new newTask(dayjs().subtract(1,'day').format('dddd, MMM D, YYYY'), list2.length);
        const newTask3 = new newTask(dayjs().format('dddd, MMM D, YYYY'), list3.length);



  
           setAllTaskCompleted([ newTask1, newTask2, newTask3]);
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
      <div className="allTask">
        {
          completedValue.map((task) => {
           <div className="task" key={task.id}>
             <p>{task.date}</p>
            <p>{task.taskName}</p>
            <p>{task.taskCompleted}</p>
           </div>
          })
        }
      </div>
    </div>
  );
}


export default Productivity;
