import { useState } from 'react'
import './App.css'
import { Routes, Route} from 'react-router-dom'
import Layout from './Layout'
import Login from './components/Login'
import Register from './components/Register'
import RequireAuth from './auth/RequireAuth'
import Home from './components/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={ <Layout />}>
      <Route element={<RequireAuth />} >
          <Route exact path="/" element={ <Home /> } />
      </Route>
        <Route path="login" element={ <Login /> } />
        <Route path="register" element={ <Register /> } />
        <Route path="*" element={ <h1 className='text-3xl font-bold underline'>404 Not Found</h1> } />
      </Route>
    </Routes>
  )
}

export default App
