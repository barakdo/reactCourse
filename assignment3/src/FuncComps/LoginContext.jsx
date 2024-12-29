import React, { useState, createContext } from 'react'
import {loadUsers, saveUserInSessionStorage} from '../Functions/userFuncs';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedUser, setIsLoggedUser] = useState("no");
  const [isLoggedAdmin, setIsLoggedAdmin] = useState("no");
  const [isFailedLogin, setIsFailedLogin] = useState("no");
  const [isEditUserDetails, setIsEditUserDetails] = useState("no");
  const [isSessionUpdated, setIsSessionUpdated] = useState("no");
  const [userIdEdit, setUserIdEdit] = useState("");

  const loginAttempt = (username, password) => {
    let isFound = false;
      const userList = loadUsers();
      for (const user of userList) {
        if (user.username == username && user.password == password) {
          isFound = true;
          if(user.username == "admin"){
            setIsLoggedAdmin("yes");
          }
          else{
            setIsLoggedUser("yes");
          }
          saveUserInSessionStorage(user.id);
        }
    }
    if(!isFound){
      alert("Account doesn't exist!")
      setIsFailedLogin("yes");
    }
  }

  const logout = () => {
    setIsLoggedUser("no");
    setIsLoggedAdmin("no");
    sessionStorage.clear();
  }

  return (
    <LoginContext.Provider value={{userIdEdit, setUserIdEdit, isSessionUpdated, setIsSessionUpdated, setIsEditUserDetails, isEditUserDetails, isLoggedUser, isLoggedAdmin, setIsLoggedAdmin, setIsLoggedUser, isFailedLogin, setIsFailedLogin, loginAttempt, logout }}>
      {children}
    </LoginContext.Provider>
  )
}
