import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import './form.css'


function AddTask() {
  
  const [task, setTasK] = useState({
    name: '',
    details:'',
    dueDate: '',
  })
  
  const navigate = useNavigate();

  function handleSubmit(e){
   e.preventDefault();

   axios.post('http://localhost:5000/addTask', task)
   .then((res) => {
     console.log(res);
     navigate('/productivity-tracker');
   })
   .catch((err) => console.log(err))

  }

  return (
    <div className="w-full bg-sky-100 h-screen py-40 px-60" id="task-form">
      <form onSubmit={handleSubmit}  className="w-2/3 flex flex-col gap-3s m-auto bg-stone-500/75 p-6 rounded-lg text-black">
       <div className="flex flex-col gap-3  ">
        <label className="text-2xl font-semibold" >Name Of Task:</label>
        <input type="text" placeholder="Complete React Project" className="border border-black py-3 px-1 text-black w-full rounded" required
        onChange={(e) => setTasK({...task,name:e.target.value})}
        />
       </div>
        <div className="flex flex-col gap-3 ">
          <label  className="text-2xl font-semibold" >Task description:</label>
          <input type="text" placeholder="Finish up the dashboard and integrate the chart data" className="border  border-black px-1 w-full py-3 rounded"
          onChange={(e) => setTasK({...task,details:e.target.value})}
          required/>
        </div>
        <div className="flex flex-col gap-3 ">
        <label  className="text-2xl font-semibold" >Due date:</label>
        <input type="date" placeholder="12/11/2024" className="border border-black w-full py-3 px-1 rounded text-black" 
        onChange={(e) => setTasK({...task,dueDate:e.target.value})}
        required/>
        </div>
        <button type="submit" className="bg-orange-400 mt-8 p-4 rounded-xl text-white w-32"> Add Task</button>
      </form>
    </div>
  )
}

export default AddTask
