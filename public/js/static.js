//Modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//navbar
const elemNavbar = document.getElementsByClassName("nav-item");

function removeSelected(){
    elemNavbar.forEach(element => {
        if(element.classList.contains("selected")){
            element.classList.remove("selected");
        }
    });
}