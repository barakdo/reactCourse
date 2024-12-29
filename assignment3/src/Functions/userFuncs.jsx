import User from '../Classes/User'
import { v4 as uuidv4 } from 'uuid';

export const loadUsers = () => {
  const userListJSON = localStorage.getItem("userList");
  if (userListJSON) {
    try {
      const plainObjects = JSON.parse(userListJSON);
      return plainObjects.map(
        (obj) =>
          new User(
            obj.id,
            obj.username,
            obj.password,
            obj.image,
            obj.firstname,
            obj.lastname,
            obj.email,
            obj.birthday,
            obj.city,
            obj.street,
            obj.streetNumber
          )
      );
    } catch (error) {
      console.error("Error parsing user list from localStorage:", error);
      return [];
    }
  } else {
    return [];
  }
};

export const loadUsersNoAdmin = () => {
  const allUsers = loadUsers();
  let newList = [];
  for(const user of allUsers){
    if(user.username != "admin"){
      newList.push(user);
    }
  }
  return newList;
}

const convertImagePathToFile = async (imagePath, fileName) => {
  try {
    const response = await fetch(imagePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const blob = await response.blob();
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  } catch (error) {
    console.error("Error converting image to File:", error);
    throw error;
  }
};


export const createAdminUser = async () => {
  let userList = [];
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      const imageBase64 = reader.result;
      let newUser = new User("admin", "admin", "ad12343211ad", imageBase64, "Admin", "Istrator", "admin@gmail.com", "20/6/1995", "Tel-Mond", "השיכר", 31);
      userList.push(newUser);
      localStorage.setItem("userList", JSON.stringify(userList));
      resolve(userList);  // Resolve after saving to localStorage
    };

    convertImagePathToFile("../assets/images/admin.png", "admin.png").then((file) => {
      reader.readAsDataURL(file);
    }).catch(error => {
      reject("Error converting image path to file: " + error);
    });
  });
};

export const newUser = (id, username, password, image, firstName, lastName, email, birthday, city, street, streetNumber) => {
  const reader = new FileReader();
  reader.onload = () => {
    const imageBase64 = reader.result;
    if (id == "") {
      id = uuidv4();
    }
    let newUser = new User(id, username, password, imageBase64, firstName, lastName, email, birthday, city, street, streetNumber);
    let userList = localStorage.getItem("userList");
    userList = JSON.parse(userList);
    userList.push(newUser);
    localStorage.setItem("userList", JSON.stringify(userList));
  };
  reader.readAsDataURL(image);
}


export const findUser = (userId) => {
  const userList = loadUsers();
  for (const user of userList) {
    if (user.id == userId) {
      return user;
    }
  }
  return null;
}

export const saveUserInSessionStorage = (userId) => {
  const user = JSON.stringify(findUser(userId));
  sessionStorage.setItem("loggedUser", user);
}

export const removeUserFromSessionStorage = () => {
  sessionStorage.clear();
}

export const userNameExists = (username) => {
  const userList = loadUsers();
  for (const user of userList) {
    if (user.username == username) {
      return true;
    }
  }
  return false;
}

export const userLoggedIn = () => {
  return JSON.parse(sessionStorage.getItem("loggedUser"));
}

export const checkSession = (typeOfUser) => {
  const user = JSON.parse(sessionStorage.getItem("loggedUser"));
  if (user == null) {
    return "no";
  }
  else if (typeOfUser == "admin") {
    if (user.username == "admin") {
      return "yes";
    }
    return "no";
  }
  else {
    if (user.username == "admin") {
      return "no";
    }
    return "yes";
  }
}

export const deleteUserByEmail = (userEmail) => {
  const userList = loadUsers();
  const newUserList = [];
  for(const user of userList){
    if(user.email != userEmail){
      newUserList.push(user);
    }
  }
  localStorage.setItem("userList", JSON.stringify(newUserList));
}

export const convertDate = (date) => {
  date = new Date(date);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  return formattedDate;
}
