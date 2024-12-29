import React, { useContext, useState, useEffect } from 'react'

import { loadUsersNoAdmin, convertDate, deleteUserByEmail } from '../Functions/userFuncs'
import { LoginContext } from './LoginContext';

export default function SystemAdmin() {
  const { isSessionUpdated, setIsSessionUpdated, logout , setIsEditUserDetails, setUserIdEdit} = useContext(LoginContext);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const currentUsers = loadUsersNoAdmin();
    setUsers(currentUsers)
  }, [])




  useEffect(() => {
    const updatedCurrentUser = loadUsersNoAdmin();
    setUsers(updatedCurrentUser);
    setIsSessionUpdated("no");
  }, [isSessionUpdated])

  const deleteUser = (userEmail) => {
    deleteUserByEmail(userEmail);
    setIsSessionUpdated("yes");
  }


  return (
    <div className="component" style={{ borderRadius: "20px", border: '2px solid white' }}>
        <div style={{display: "flex", justifyContent: "flex-end"}}>
        <button style={{margin: "10px"}} onClick={logout}>התנתק</button>
        </div>
        <h2 style={{ textAlign: "center",}}>רשימת משתמשים</h2>
      <div style={{ justifyContent: "center", margin: "10px", padding: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', rowGap: '10px', columnGap: '10px' }}>
        <h3>פעולות</h3>
        <h3>דואר אלקטורני</h3>
        <h3>כתובת</h3>
        <h3>תאריך לידה</h3>
        <h3>שם מלא</h3>
        <h3>שם משתמש</h3>
      </div>
      <div style={{alignItems:"center" ,justifyContent: "center", margin: "10px", padding: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', rowGap: '10px', columnGap: '10px' }}>
        {users.map((user, index) => (
          <React.Fragment key={index}>
            <div style={{display:"flex", justifyContent: "space-around", alignItems:"center" }}>
              <button onClick={() => deleteUser(user.email)}>מחק</button>
              <button onClick={() => {setIsEditUserDetails("yes"); setUserIdEdit(user.id)}}>ערוך</button>
            </div>
            <div>{user.email}</div>
            <div>{user.street + " " + user.streetNumber + ", " + user.city}</div>
            <div>{convertDate(user.birthday)}</div>
            <div>{user.firstname + " " + user.lastname}</div>
            <div style={{alignItems:"center", justifyContent: "center", margin: "10px", padding: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '10px', columnGap: '10px'}}>
              {user.username}
            <img style={{ height: "50px" }} src={user.image} alt="" />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
