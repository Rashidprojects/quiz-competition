import React, { Suspense } from 'react'
import { Routes,Route } from 'react-router-dom'
import AuthRoutes from './AuthRoutes'
import AdminRoutes from './AdminRoutes'
import { UserProvider } from '../context/UserContext'

// Lazy load the Home and About components
const Home = React.lazy(() => import('../pages/Home') )
const AboutPage = React.lazy(() => import('../pages/AboutPage') )
const Rules = React.lazy(() => import('../pages/Rules') )
const Result = React.lazy(() => import('../pages/Result') )
const ContactPage = React.lazy(() => import('../pages/ContactPage'))

const AppRoutes = () => {
  return (
    
    <Suspense fallback={ <div>Loading</div> } >
      <UserProvider>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='rules/' element={<Rules/>} />
            <Route path='result/' element={<Result />} />
            <Route path='about/' element={<AboutPage />} />
            <Route path='contact/' element={<ContactPage />} />

            {/* Nested Auth and Admin Routes */}
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </UserProvider>
    </Suspense>
    
  )
}

export default AppRoutes