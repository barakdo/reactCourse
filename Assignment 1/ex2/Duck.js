class Duck{
  constructor(name, color, age, weight, image){
    this.name = name;
    this.color = color;
    this.age = age;
    this.weight = weight;
    this.image = image;
  }

  Show(){
    let str = "<div>";
    str += "Name: " + this.name + "</br>";
    str += "Color: " + this.color + "</br>";
    str += "Age: " + this.age + "</br>";
    str += "Weight: " + this.weight + "</br>";
    str += "</div><div>";
    str += '<img src="'+ this.image +'" alt="Image of duck">';
    str+="</div>"
    document.getElementById("quackText").innerHTML = str;
  }

  Quack(){
    let counter = Math.floor(this.age * this.weight / 2);
    let str = "";
    for(let i = 0; i< counter; i++){
      str += "Quack ";
    }
    document.getElementById("quackText").innerHTML = str;
    playQuack();
  }
}