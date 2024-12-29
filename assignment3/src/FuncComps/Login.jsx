import React, { useEffect, useState, useContext } from 'react'
import User from '../Classes/User'
import { LoginContext } from './LoginContext';
import {loadUsers} from '../Functions/userFuncs';

export default function Login() {

  const { loginAttempt, isLoggedUser, isloggedAdmin, isFailedLogin, setIsFailedLogin } = useContext(LoginContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const changeValue = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'usernameInput':
        setUsername(value);
        break;
      case 'passwordInput':
        setPassword(value);
        break;
    }
  };

  const validPattern = (value, regPattern) => {
    return regPattern.test(value);
  };

  const loginUser = () => {
    let errorMessage = "";
    if (!validPattern(username, /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>~`+=\[\]\\';/-]{1,60}$/)) {
      errorMessage += "Username can only contain English alphabets, numbers, special characters, and be up to 60 characters in length\n";
    }
    if (!validPattern(password, /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{7,12}$/) && password != "ad12343211ad") {
      errorMessage += "Password must contain at least one special character, one capital letter, one number, and be between 7 to 12 characters in length\n";
    }
    setError(errorMessage);

    if (errorMessage == "") {
      loginAttempt(username, password);
    }
  };

  useEffect(() => {
    if(isFailedLogin == "yes"){
      setUsername("");
      setPassword("");
      setIsFailedLogin("no")
    }
  }, [isFailedLogin])
  

  useEffect(() => {
    setUsername("");
    setPassword("");
  }, [isLoggedUser, isloggedAdmin]);


  return (
    <div>
      <div style={{ borderRadius: "20px", border: '2px solid white', }}>
        <h2 style={{ marginBottom: 0 }}>Login</h2>
        <div style={{ margin: "10px", padding: '10px', textAlign: 'left', display: 'grid', gridTemplateColumns: '150px 1fr', rowGap: '10px', columnGap: '10px' }}>
          <label htmlFor="usernameInput">Username</label>
          <input value={username} onChange={changeValue} name='usernameInput' type="text" />
          <label htmlFor="passwordInput">Password</label>
          <input value={password} onChange={changeValue} name='passwordInput' type="password" />
        </div>
        <input style={{ width: "90%", marginBottom: "20px" }} value="Login" name="submit" type="button" onClick={loginUser} />
      </div>
      <pre style={{ color: "red", textAlign: "left", padding: "20px" }}>{error}</pre>
    </div>
  )
}


