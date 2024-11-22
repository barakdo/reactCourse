class Counter {
  constructor(num) {
    this.num = num;
  }

  Initialize(num) {
    this.num = num;
  }
  Increment() {
    this.num++;
  }
  Go() {
    var str = "";
    for (let i = 0; i <= this.num; i++) {
      str+= i + " ";
    }
    document.getElementById("para").innerHTML = str;
  }
}