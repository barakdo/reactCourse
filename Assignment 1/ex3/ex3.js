var clocks = new Array();
var clock;
var count = 5;
window.onload = function () {
  const clockForm = document.getElementById("clockForm");
  clockForm.addEventListener('submit', addClock);
};

function addClock(event) {
  event.preventDefault();
  const country = document.getElementById('country').value;
  const hours = document.getElementById('hours').value;
  const mins = document.getElementById('mins').value;
  const secs = document.getElementById('secs').value;
  clock = new Clock(country, hours, mins, secs);
  clocks.push(clock);
  document.getElementById('country').value = "";
  document.getElementById('hours').value = "";
  document.getElementById('mins').value = "";
  document.getElementById('secs').value = "";
  count--;
  document.getElementById("lblBtn").innerText = count + " Clocks left";
  if (count == 1) {
    document.getElementById("lblBtn").innerText = count + " Clock left";
  }
  if (count == 0) {
    document.getElementById("lblBtn").innerText = "Clock list is full!";
    document.getElementById("btnAddClock").disabled = true;
    clockForm.removeEventListener('submit', addClock);
    const clockList = document.getElementById('clockList');
    clockList.style.visibility = 'visible';
    showList();
  }
}

function showList() {
  let str = "";
  for (let i = 0; i < 5; i++) {
    str+= "<div>"
    str+= "<h3>Clock Number " + Number(i+1) + ":</h3>"
    str+= "<p>Country: " + clocks[i].country + " </p>"
    str+= "<p>Time: " + clocks[i].Show() + " </p>"
    str+= "<p>Seconds from midnight: " + clocks[i].ConvertToSeconds() + " </p>"
    str+= "</div>";
    document.getElementById("clockList").innerHTML = str;
  }
}
