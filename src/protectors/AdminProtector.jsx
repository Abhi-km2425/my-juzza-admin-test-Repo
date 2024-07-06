
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


const AdminProtector = () => {
    const user = useSelector((state) => state.auth.userInfo)
    console.log("user",user)
    // const user = {role:"admin"}
  
    return (
      user?.role === "admin" ? <Outlet/> : <Navigate to='/login' replace/>
    )
}

export default AdminProtector