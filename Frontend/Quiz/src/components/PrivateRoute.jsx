import React from 'react'
import { Navigate,useLocation } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'

const PrivateRoute = ({children}) => {

    const isAuthenticated = true
    const location = useLocation()
  return isAuthenticated ? children : <Navigate to='/auth/login/' state={{ from: location }}  replace />
}

export default PrivateRoute