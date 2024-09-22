import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Login() {
  const [values, setValues] = useState({
    username: '',
    password: '',
  })

  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();

    console.log(values);
    axios.post('http://localhost:5000/login', values)
    .then((res) => {
      console.log(res);
      navigate('/');
    })
    .catch((err) => console.log(err))
  }
  return (
    <div className="w-full h-screen py-40 px-60" onSubmit={handleSubmit} >
      <form   className="w-2/3 flex flex-col gap-3  rounded-lg text-black">
      
        <div className="flex flex-col gap-3 ">
          <label  className="text-2xl font-semibold" >Username:</label>
          <input type="text" placeholder="Username" className="border  border-black px-1 w-full py-3 rounded"
           onChange={(e) => setValues({ ...values, username: e.target.value })}
          required/>
        </div>
        <div className="flex flex-col gap-3 ">
        <label  className="text-2xl font-semibold" >Password</label>
        <input type="password" className="border border-black w-full py-3 px-1 rounded text-black"  onChange={(e) => setValues({ ...values, password: e.target.value })}
        required/>
        </div>
        <button type="submit" className="bg-orange-400 p-4 mt-8 rounded-xl text-white w-32"> Login</button>
      </form>
      <p className="pt-8">Not registered, <Link to='/register' className='text-orange-300'>Register Now</Link></p>
    </div>
  )
}

export default Login
