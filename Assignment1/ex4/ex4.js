//#2
function XYInArray(pointsArr, x, y) {
  const point = new Point(x, y);
  for (const p of pointsArr) {
    if (p.Equals(point)) {
      return true;
    }
  }
  return false;
}

//#3
//Same funtion name for overLoading function :)
function pointInArray(pointsArr, point) {
  for (const p of pointsArr) {
    if (p.Equals(point)) {
      return true;
    }
  }
  return false;
}

//#4
function routeDistance(pointsArr) {
  let sum = 0;
  for (let i = 0; i < pointsArr.length - 1; i++) {
    sum += distance(pointsArr[i], pointsArr[i + 1]);
  }
  return sum;
}

function distance(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}


window.onload = function () {
  const AddPointForm = document.getElementById("AddPointForm");
  AddPointForm.addEventListener('submit', addPoint);
  const CheckIfXYForm = document.getElementById("CheckIfXYForm");
  CheckIfXYForm.addEventListener('submit', checkXYInArray);
}; 3

let arr = new Array();

function addPoint(event) {
  event.preventDefault();
  const x = document.getElementById("x").value;
  const y = document.getElementById("y").value;
  const p = new Point(x, y);
  arr.push(p);
  document.getElementById("divList").style.visibility = "visible";
  printPoints();
}

function checkXYInArray(event) {
  event.preventDefault();
  const x = document.getElementById("x1").value;
  const y = document.getElementById("y1").value;
  const p = new Point(x, y);
  if(pointInArray(arr, p)){
    alert("The array contains the point");
  }
  else{
    alert("The array does not contain the point");
  }
  
}

function printPoints() {
  let str = "Points: {";
  for (const p of arr) {
    str += p.Show() + " ,";
  }
  str = str.substring(0, str.length - 2);
  str += "}</br>";
  totalDistance = routeDistance(arr);
  str += "Total Distance: " + totalDistance.toFixed(3);
  document.getElementById("pointsList").innerHTML = str;
}