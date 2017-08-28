var selectedCount = document.querySelectorAll(".selected").length,
removeInfo = document.getElementById("remove-info"),
selectedInfo = document.getElementById("selected-info");
function selected(e, product){
  var classList = product.classList;
  classList.contains("selected") ? classList.remove("selected") : classList.add("selected");
  selectedCount = document.querySelectorAll(".selected").length;
  selectedCount == 0 ? removeInfo.style.display = "block" : removeInfo.style.display = "none";
  selectedInfo.innerText = 'Number of Selected Containers '+ selectedCount;
}
function containerRequest(e, form){
  if(selectedCount != 0){
    var name = form["name"].value;
    var surname = form["surname"].value;
    var phone = form["phone"].value;
    var email = form["email"].value;
    var desc = form["desc"].value;
    removeInfo.style.display = "block";
    removeInfo.style.color = "#000";
    removeInfo.innerText = "Success";
  }
  else{
    removeInfo.style.color = "red";
  }
  e.preventDefault();
}