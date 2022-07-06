import React from 'react';
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const user = localStorage.getItem('user')
    if (user) {
        return children
    } else {
        return < Navigate to='/' replace />
    }
}

export default PrivateRoute