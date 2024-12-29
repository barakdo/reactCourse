import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './FuncComps/Register'
import Profile from './FuncComps/Profile'
import Login from './FuncComps/Login'
import SystemAdmin from './FuncComps/SystemAdmin'
import { LoginContext } from './FuncComps/LoginContext';
import { createAdminUser, loadUsers, checkSession } from './Functions/userFuncs';
import EditDetails from './FuncComps/EditDetails'



function App() {
  const { isLoggedUser, setIsLoggedUser, isLoggedAdmin, setIsLoggedAdmin, isEditUserDetails } = useContext(LoginContext);

  useEffect(() => {
    if (localStorage.getItem("userList") == null) {
      let userList = [];
      userList.push(createAdminUser());
      localStorage.setItem("userList", JSON.stringify(userList));
    }
    setIsLoggedUser(checkSession("user"));
    setIsLoggedAdmin(checkSession("admin"));
  }, []);




  return (
    <div>
      <h1>The Super Duper Ultimate Admin Management System </h1>
      <div style={{ display: 'flex', rowGap: '10px', columnGap: '10px' }}>
        {isLoggedUser == "no" && isLoggedAdmin == "no" && <Register />}
        {isLoggedUser == "no" && isLoggedAdmin == "no" && <Login />}
        {isLoggedUser == "yes" && <Profile />}
        {isLoggedAdmin == "yes" && <SystemAdmin />}
        {
          (isEditUserDetails == "yes") &&
          (isLoggedUser == "yes" || isLoggedAdmin == "yes") && <EditDetails />}
      </div>
    </div>
  )
}

export default App
