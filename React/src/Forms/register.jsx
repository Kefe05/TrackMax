import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    console.log(values)

    axios.post('http://localhost:5000/register', values)
      .then((res) => {
        console.log(res);
        navigate('/login');
      })
      .catch((err) => console.log(err));
    

      
  }

  return (
    <div className="w-full h-screen py-8 px-60">
      <form onSubmit={handleSubmit} className="w-2/3 flex flex-col gap-3 rounded-lg text-black">
        <div className="flex flex-col gap-3">
          <label className="text-2xl font-semibold">Name</label>
          <input 
            type="text" 
            placeholder="Name" 
            className="border border-black py-3 px-1 text-black w-full rounded" 
            required 
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-2xl font-semibold">Username</label>
          <input 
            type="text" 
            placeholder="Username" 
            className="border border-black px-1 w-full py-3 rounded"
            required 
            onChange={(e) => setValues({ ...values, username: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-2xl font-semibold">Email</label>
          <input 
            type="email" 
            placeholder="Johndoe@gmail.com" 
            className="border border-black w-full py-3 px-1 rounded text-black" 
            required 
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-2xl font-semibold">Password</label>
          <input 
            type="password" 
            className="border border-black w-full py-3 px-1 rounded text-black" 
            required 
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
        </div>
        <button type="submit" className="bg-orange-400 mt-8 p-4 rounded-xl text-white w-32">Register</button>
      </form>
      <p className=' pt-8'>Registered, <Link className='text-orange-300' to='/login'>Login Now</Link></p>
    </div>
  );
}

export default Register;
