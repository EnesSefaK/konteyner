new Choices('.select', {
  noResults: 'has-no-results',
  noChoices: 'has-no-choices',
  removeItems: true,
  removeItemButton: true,
});

function remove (removeafter){
  var elem = removeafter.nextElementSibling;
  if(elem)
    elem.style.display = "none";
    remove(elem);
}

window.onload = function() {
var afterRemove  = document.getElementById("after-remove");
remove(afterRemove)
}

document.getElementById("mobilenav").addEventListener("click", function(){
  const navMenu = document.getElementById("header-nav");
  if (this.classList.contains("active")){
    this.classList.remove("active");
    navMenu.style.display = "none";
  }
  else{
    this.classList.add("active");
    navMenu.style.display = "block";
  }
});