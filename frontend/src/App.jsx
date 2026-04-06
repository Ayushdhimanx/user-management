import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import ProtectedRoute from "../routes/protectedroutes";
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from './pages/notfound'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>

<Route path="/" element={<Login />}></Route>

      <Route path="/dashboard" element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route path='*' element={<NotFound />} />
    </Routes>
     <ToastContainer position="top-right" autoClose={3000}   theme="colored" />
    </>
  )
}

export default App
