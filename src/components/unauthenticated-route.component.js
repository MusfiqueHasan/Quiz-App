import React from 'react';
import { Navigate } from "react-router-dom";


const UnAuthenticatedRoute = ({ children }) => {
  const user = localStorage.getItem('user')
  if (!user) {
    return children
  } else {
    return < Navigate to='/new-quiz' replace />
  }

}

export default UnAuthenticatedRoute