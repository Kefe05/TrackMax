import { NavLink, Outlet } from "react-router-dom"
import Navbar from "../navBar/navbar"

export function RootLayout(){
  return(
   <div>
     <Navbar />
    <main className='"bg-orange-50'>
      <Outlet/>
    </main>
    </div>   
  )
}