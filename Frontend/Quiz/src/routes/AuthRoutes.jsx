import React from 'react'
import { Routes, Route, Router } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='login/' element={<LoginPage />} />
      <Route path='register/' element={<RegisterPage />} />
    </Routes>
  )
}

export default AuthRoutes
