import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="flex flex-col w-fit h-screen justify-between text-center bg-white p-9 fixed shadow">
      <div className="flex flex-col gap-5">
        <Link to='/login' className="flex flex-col gap-1">
          <CgProfile className="text-5xl m-auto" />
          <span>Login</span>
          </Link> 
          <Link to='/' className="flex gap-2 items-center">
            <FaHome />
            <span>Dashboard</span>
          </Link>
          <Link to='/expense-tracker' className="flex gap-2 items-center">
            <MdPayment />
            <span>Expense Tracker</span>
          </Link>
          <Link to='/productivity-tracker'className="flex gap-2 items-center">
            <FaTasks />
            <span>Productivity Tracker</span>
          </Link>
          <Link className="flex gap-2 items-center">
            <ImStatsDots />
            <span>Statistics</span>
          </Link>
          <Link className="flex gap-2 items-center">
            <CiSettings />
            <span>Settings</span>
          </Link>
        </div>
        <div className="">
        <button className="bg-orange-300 px-4 py-2 rounded-xl text-amber-900 text-white">Invite Team</button>
        </div>
    </nav>
  )
}

export default Navbar
