var counter;
var init = false;

function start(){
  if(document.getElementById("textbox").value == "")
    {
      alert("textbox doesn't contain any number");
    }
    else
    {
      counter = new Counter(document.getElementById("textbox").value);
      init = true;
    }
}

function plus(){
  if(!init){
    alert("First, you need to enter a number and press 'start' to preform this action");
  }
  else{
    counter.Increment();
  }
}

function print(){
  if(!init){
    alert("First, you need to enter a number and press 'start' to preform this action");
  }
  else{
      counter.Go();
    }
}