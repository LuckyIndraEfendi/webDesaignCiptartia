import React, { useState, useEffect, useRef } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"
import { Dashboard, Login, Register } from './pages'
import './styles/css/main.css'
import { auth } from './config/firebase/firebaseConfig'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { HashLoader } from 'react-spinners'

function App() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true)
        setisLoading(false)
        console.log('user sudah login')
        navigate('/dashboard')
      } else {
        setIsLogin(false)
        setisLoading(false)
        navigate('/')
        console.log('user blm login')

      }
    })
  }, [])

  if (isLoading) {
    return (
      <div className="" style={{ background: '#2b2f2e' }}>
        <HashLoader color="#36d7b7" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />
        <h5 style={{ color: '#fff', fontFamily: 'system-ui' }}>Loading ...</h5>
      </div>
    )
  }
  return (
    <>

      {isLogin ? (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      ) : (<Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>)}


    </>
  )
}

export default App
