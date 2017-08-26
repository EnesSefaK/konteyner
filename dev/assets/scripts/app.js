new Choices('.select', {
  noResults: 'has-no-results',
  noChoices: 'has-no-choices',
  removeItems: true,
  removeItemButton: true,
});

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

const asideBtn = document.querySelectorAll(".asidesearchbtn"),
  asideSearchBar = document.getElementById("searchaside"),
  asideSearchBarWidth = asideSearchBar.offsetWidth,
  pageWrapper = document.getElementById("page-wrapper"),
  body = document.getElementsByTagName("body")[0];

TweenMax.set(asideSearchBar, {
  x: -asideSearchBarWidth
});

for (let i = 0; i < asideBtn.length; i++) {

  asideBtn[i].addEventListener("click", function () {
    if (asideSearchBar.classList.contains("active")) {
      asideSearchBar.classList.remove("active");
      body.style.overflow = "auto";
      TweenMax.to(asideSearchBar, .5, {
        x: -asideSearchBarWidth,
        ease: Power0.easeNone,
        yoyo: true
      });
      TweenMax.to(pageWrapper, .5, {
        x: 0,
        ease: Power0.easeNone,
        yoyo: true
      });
    } else {
      asideSearchBar.classList.add("active");
      body.style.overflow = "hidden";
      TweenMax.to(asideSearchBar, .5, {
        x: 0,
        ease: Power0.easeNone,
        yoyo: true
      });
      TweenMax.to(pageWrapper, .5, {
        x: 300,
        ease: Power0.easeNone,
        yoyo: true
      });
    }
  });

}