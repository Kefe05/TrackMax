import { useState } from "react"
import { tasks } from "../charts/data"
import { Link } from "react-router-dom"
import './form.css'


function AddExpense() {
  
  const [task, setTasK] = useState({
    
  })
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')

  function handleSubmit(e){
   e.preventDefault();
   tasks.push({name:taskName, details, dueDate});
   console.log(tasks)
  }

  return (
    <div className="w-full bg-sky-100 h-screen py-40 px-60" id="task-form">
      <form onSubmit={handleSubmit}  className="w-2/3 flex flex-col gap-3s m-auto bg-stone-500/75 p-6 rounded-lg text-black">
       <div className="flex flex-col gap-3  ">
        <label className="text-2xl font-semibold" >Expense Category:</label>
        <input type="text" placeholder="Complete React Project" className="border border-black py-3 px-1 text-black w-full rounded" required
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        />
       </div>
        <div className="flex flex-col gap-3 ">
          <label  className="text-2xl font-semibold" >Cost :</label>
          <input type="text" placeholder="Finish up the dashboard and integrate the chart data" className="border  border-black px-1 w-full py-3 rounded"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required/>
        </div>
        
        <button type="submit" className="bg-orange-400 mt-8 p-4 rounded-xl text-white w-32"> Add Task</button>
      </form>
    </div>
  )
}

export default AddTask
