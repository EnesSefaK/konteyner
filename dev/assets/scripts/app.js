const choices = new Choices('.select', {
  noResults: 'has-no-results',
  noChoices: 'has-no-choices',
  removeItems: true,
  removeItemButton: true,
});

document.getElementById("mobilenav-btn").addEventListener("click", function(){
  if (this.classList.contains("active")){
    this.classList.remove("active");
  }
  else{
    this.classList.add("active");
  }
});