import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet,  } from 'react-router-dom';


const AuthProtector = () => {
    const user = useSelector((state) => state.auth.userInfo)
    console.log("user",user)

    // const user = {role:"admin"}

    return (
      user?.role === "admin"
        ? <Navigate to="/admin/dashboard" replace />
        : <Outlet />
    )
}

export default AuthProtector