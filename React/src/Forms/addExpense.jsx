import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import './form.css'



function AddExpense() {
  
  const [expense, setExpense] = useState({
    category: 'Rent',
    amount: '',
    dueDate: ''
  })
  
  const navigate = useNavigate()


  function handleSubmit(e){
    e.preventDefault();
 
    axios.post('http://localhost:5000/addExpense', expense)
    .then((res) => {
      console.log(res);
      navigate('/expense-tracker');
    })
    .catch((err) => console.log(err))
 
   }

  return (
    <div className="w-full bg-sky-100 h-screen py-40 px-60" id="expense-form">
      <form onSubmit={handleSubmit}  className="w-2/3 flex flex-col gap-3s m-auto bg-stone-500/75 p-6 rounded-lg text-black">
       <div className="flex flex-col gap-3  ">
        <label className="text-2xl font-semibold" >Expense Category:</label>
        <select className="p-4 rounded " onChange={(e) => setExpense({...expense, category:e.target.value})}>
          <option value='Rent'>Rent</option>
          <option value='Fees'>Fees</option>
          <option value="Bills">Bills</option>
          <option value="Loan">Loan</option>
          <option value="Transportation">Transportation</option>
          <option value="Healthcare">Healthcare</option>
        </select>
       </div>
        <div className="flex flex-col gap-3 ">
          <label  className="text-2xl font-semibold" >Amount:</label>
        <input type="text" placeholder='200' className="p-4 rounded"
        onChange={(e) => setExpense({...expense, amount:e.target.value})}/>
        </div>
        <div className="flex flex-col gap-3 ">
          <label  className="text-2xl font-semibold" >Due date:</label>
          <input type="date" placeholder="12/11/2024" className="border border-black w-full py-3 px-1 rounded text-black" 
          onChange={(e) => setExpense({...expense,dueDate:e.target.value})}
          required/>
        </div>
        
        <button type="submit" className="bg-orange-400 mt-8 p-4 rounded-xl text-white w-32"> Add Expense</button>
      </form>
      <p></p>
    </div>
  )
}

export default AddExpense
