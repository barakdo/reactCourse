import React, { useContext, useState, useEffect } from 'react'
import { LoginContext } from './LoginContext';
import { deleteUserByEmail, userLoggedIn, userNameExists, saveUserInSessionStorage, findUser } from '../Functions/userFuncs';

import User from '../Classes/User';

export default function EditDetails() {
  const { setIsEditUserDetails, setIsSessionUpdated, isLoggedAdmin, userIdEdit, setUserIdEdit } = useContext(LoginContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
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
      case 'passwordRepeatInput':
        setRepeatPassword(value);
        break;
      case 'firstNameInput':
        setFirstName(value);
        break;
      case 'lastNameInput':
        setLastName(value);
        break;
      case 'emailInput':
        if (isLoggedAdmin == "yes") {
          setEmail(value);
        }
        break;
      case 'birthdayInput':
        setBirthday(value);
        break;
      case 'cityInput':
        setCity(value);
        break;
      case 'streetInput':
        setStreet(value);
        break;
      case 'streetNumberInput':
        setStreetNumber(value);
        break;
    }
  };

  const changeImage = (e) => {
    setImage(e.target.files[0]);
  };



  const validPattern = (value, regPattern) => {
    return regPattern.test(value);
  };

  useEffect(() => {
    
    const user = userToBeEdit();
    setUsername(user.username);
    setPassword(user.password);
    setFirstName(user.firstname);
    setLastName(user.lastname);
    setEmail(user.email);
    setBirthday(new Date(user.birthday).toISOString().split('T')[0]);
    setCity(user.city);
    setStreet(user.street);
    setStreetNumber(user.streetNumber);
  }, [])


  const userToBeEdit = () => {
    if (isLoggedAdmin == "yes") {
      return findUser(userIdEdit);
    }
    else {
      return userLoggedIn();
    }
  }

  const editUser = () => {
    let errorMessage = "";

    if (userNameExists()) {
      errorMessage += "Username already exists\n";
    }
    if (!validPattern(username, /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>~`+=\[\]\\';/-]{1,60}$/)) {
      errorMessage += "Username can only contain English alphabets, numbers, special characters, and be up to 60 characters in length\n";
    }
    if (!validPattern(password, /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{7,12}$/)) {
      errorMessage += "Password must contain at least one special character, one capital letter, one number, and be between 7 to 12 characters in length\n";
    }
    if ((image.type != "image/jpg" && image.type != "image/jpeg") && image != "") {
      errorMessage += "image should be only in jpeg or jpg format\n";
    }
    if (!validPattern(firstName, /^\p{L}+$/u)) {
      errorMessage += "First name can only contain alphabets\n";
    }
    if (!validPattern(lastName, /^\p{L}+$/u)) {
      errorMessage += "Last name can only contain alphabets\n";
    }
    if (!validPattern(email, /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.com$/)) {
      errorMessage += "The email can only contain English letters and allowed special characters. It must include exactly one '@' symbol and end with '.com'\n";
    }
    if (birthday == "") {
      errorMessage += "Enter your birthday\n";

    }
    else {
      const currentBD = new Date(birthday);
      const currentTime = new Date();
      const yearsDiff = ((currentTime - currentBD) / 1000 / 3600 / 24 / 365);

      if (yearsDiff <= 18 || yearsDiff >= 120) {
        errorMessage += "The age must be between 18 and 120\n";
      }
    }

    if (!validPattern(street, /^[א-ת\s]+$/)) {
      errorMessage += "The street name must contain only Hebrew letters\n";
    }

    if (!validPattern(streetNumber, /^[1-9][0-9]*$/)) {
      errorMessage += "The street number must contain a positive number only\n";
    }

    setError(errorMessage);

    if (errorMessage == "") {
      const user = userToBeEdit();
      deleteUserByEmail(user.email);
      if (image != "") {
        const reader = new FileReader();
        reader.onload = () => {
          const imageBase64 = reader.result;
          let newUser = new User(user.id, username, password, imageBase64, firstName, lastName, email, birthday, city, street, streetNumber);
          let userList = localStorage.getItem("userList");
          userList = JSON.parse(userList);
          userList.push(newUser);
          localStorage.setItem("userList", JSON.stringify(userList));
          saveUserInSessionStorage(user.id);
          setIsEditUserDetails("no");
          setIsSessionUpdated("yes");
        };
        reader.readAsDataURL(image);
      }
      else {
        const newUser = new User(user.id, username, password, user.image, firstName, lastName, email, birthday, city, street, streetNumber);
        let userList = localStorage.getItem("userList");
        userList = JSON.parse(userList);
        userList.push(newUser);
        localStorage.setItem("userList", JSON.stringify(userList));
        saveUserInSessionStorage(user.id);
        setIsEditUserDetails("no");
        setIsSessionUpdated("yes");
      }
      alert("User's details updated successfully!");
      setUsername("");
      setPassword("");
      setImage("");
      setFirstName("");
      setLastName("");
      setBirthday("");
      setCity("");
      setStreet("");
      setStreetNumber("");
    }
  };

  const styleFunc = (e) => {

    if (isLoggedAdmin == "yes") {
      return {}
    }
    else {
      return { display: "none" }
    }
  }



  return (
    <div style={{ borderRadius: "20px", border: '2px solid white' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: "10px" }}>
        <button style={{ color: "white", backgroundColor: "red", fontWeight: "700", fontSize: "20px", border: "solid white 1px" }} onMouseEnter={(e) => { e.target.style.backgroundColor = "white"; e.target.style.color = "red" }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = "red"; e.target.style.color = "white" }} onClick={() => setIsEditUserDetails("no")}>X</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: '10px', margin: "20px" }}>
        <div style={{ margin: "10px", padding: '10px', textAlign: 'left', display: 'grid', gridTemplateColumns: '150px 1fr', rowGap: '10px', columnGap: '10px' }}>
          <label htmlFor="usernameInput">Username</label>
          <input value={username} onChange={changeValue} name='usernameInput' type="text" />
          <label htmlFor="passwordInput">Password</label>
          <input value={password} onChange={changeValue} name='passwordInput' type="password" />
          <label htmlFor="imageInput">Image</label>
          <input files={image} onChange={changeImage} name='imageInput' type="file" accept=".jpg, .jpeg" />
          <label htmlFor="firstNameInput">First Name</label>
          <input value={firstName} onChange={changeValue} name='firstNameInput' type="text" />
          <label htmlFor="lastNameInput">Last Name</label>
          <input value={lastName} onChange={changeValue} name='lastNameInput' type="text" />
          <label style={styleFunc()} htmlFor="emailInput">Email</label>
          <input style={styleFunc()} value={email} onChange={changeValue} name='emailInput' type="email" />
          <label htmlFor="birthdayInput">Birthday</label>
          <input value={birthday} onChange={changeValue} name='birthdayInput' type="date" />
          <label htmlFor="cityInput">City</label>
          <input list="city-list" value={city} onChange={changeValue} name='cityInput' type="text" />
          <datalist id="city-list">
            <option value="Netanya" />
            <option value="Tel-Aviv" />
            <option value="Haifa" />
            <option value="Ruppin" />
            <option value="Tel-Mond" />
            <option value="Ashdod" />
            <option value="Eilat" />
          </datalist>
          <label htmlFor="streetInput">Street</label>
          <input value={street} onChange={changeValue} name='streetInput' type="text" />
          <label htmlFor="streetNumberInput">Street Number</label>
          <input value={streetNumber} onChange={changeValue} name='streetNumberInput' type="number" min={1} />
        </div>
      </div>
      <button style={{ borderRadius: "5px", width: "90%", marginBottom: "20px", color: "white", backgroundColor: "green" }} name="submit" onClick={editUser} >Update Details</button>

      <pre style={{ color: "red", textAlign: "left", padding: "20px" }}>{error}</pre>

    </div>
  )
}
