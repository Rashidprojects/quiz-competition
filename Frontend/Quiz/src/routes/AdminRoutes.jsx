import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/admin/Dashboard'
import MangaUsers from '../pages/admin/MangaUsers'
import PrivateRoute from '../components/PrivateRoute'

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path='dashboard/' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path='manage-users/' element={<PrivateRoute><MangaUsers /></PrivateRoute>} />
        </Routes>
    )
}

export default AdminRoutes