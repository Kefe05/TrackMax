import './App.css'
import Dashboard from './Dashboard/dashboard'
import Expense from './Expense/expense'
import Productivity from './Productivity/productivty'
import {createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import {RootLayout} from './RouteLayout/routeLayout'
import AddTask from './Forms/addTask'
import Login from './Forms/login'
import Register from './Forms/register'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>}>
      <Route index exact element={<Dashboard/>} />
      <Route path='/expense-tracker' exact element={<Expense />} />
      <Route path='/productivity-tracker' exact element={<Productivity />} />
      <Route path='/add-new-task' exact element={<AddTask />} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/register' exact element={<Register />} />
     </Route>
    )
  )
  
  return (
   
   <RouterProvider router={router}/>
  )
}

export default App
