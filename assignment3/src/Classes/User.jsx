class User{
  constructor(id, username, password, image, firstname, lastname, email, birthday, city, street, streetNumber){
    this.id = id;
    this.username = username;
    this.password = password;
    this.image = image;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.birthday = new Date(birthday);
    this.city = city;
    this.street = street;
    this.streetNumber = streetNumber;
  }
}

export default User;