import React, { useContext, useState, useEffect } from 'react'
import { userLoggedIn } from '../Functions/userFuncs'
import { LoginContext } from './LoginContext';

export default function Profile() {
  const {logout, setIsEditUserDetails, isSessionUpdated, setIsSessionUpdated} = useContext(LoginContext);
  const currentUser = userLoggedIn();
  const [user, setUser] = useState({
    ...currentUser
})
  const convertDate = (date) => {
    date = new Date(date);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    return formattedDate;
  }

useEffect(() => {
  const updatedCurrentUser = userLoggedIn(); 
  setUser({
    ...updatedCurrentUser
  });
  setIsSessionUpdated("no");
}, [isSessionUpdated])


  return (
    <div className="component" style={{ borderRadius: "20px", border: '2px solid white' }}>
      <div style={{  margin: "10px", padding: '10px', textAlign: 'left', display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '10px', columnGap: '30px', alignItems:"center" }}>
        <div>
          <img style={{ height: "150px" }} src={user.image} alt="" />
        </div>
        <div>
          <h2>{user.firstname + " " + user.lastname}</h2>
          <h2>{user.email}</h2>
          <h2>{user.street + " " + user.streetNumber + ", " + user.city}</h2>
          <h2>{convertDate(user.birthday)}</h2>
        </div>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: '10px', margin:"20px"}}>
        <button style={{backgroundColor:"Maroon"}} onClick={logout}>התנתק</button>
        <button style={{backgroundColor:"Navy"}} onClick={() => window.open("https://www.dota2.com/home", "_blank")}>למשחק</button>
        <button onClick={() => setIsEditUserDetails("yes")}>עדכון פרטים</button>
      </div>
    </div>
  )
}
