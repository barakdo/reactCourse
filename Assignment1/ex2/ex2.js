function playQuack() {
  const audio = new Audio('quack.mp3');
  let count = 0;
  audio.addEventListener('ended', playNext);
  audio.play();
  function playNext() {
    count++;
    if (count < 3) {
      audio.play();
    } else {
      audio.removeEventListener('ended', playNext); 
    }
  }
}


var duck;
window.onload = function(){
  const duckForm = document.getElementById("duckForm");
  duckForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const color = document.getElementById('color').value;
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const image = document.getElementById('image').value;
    duck = new Duck(name, color, age, weight, image);
    const btnShow = document.getElementById('btnShow');
    const btnQuack = document.getElementById('btnQuack');
    btnShow.style.visibility = 'visible';
    btnQuack.style.visibility = 'visible';
    document.getElementById('createDuck').disabled = true;
  });
};

function Show(){
  duck.Show();
}
function Quack(){
  duck.Quack();
}


  
