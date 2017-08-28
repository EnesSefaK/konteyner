const button = document.querySelectorAll(".search-list-button"),
popup = document.getElementById("popup"),
popupContent = document.getElementById("popup-content"),
content = document.getElementById("search-form-content");

TweenMax.set(popupContent, {
transformOrigin: "50% 50%",
scale: 0,
alpha: 0
});

for (let i = 0; i < button.length; i++) {
button[i]
  .addEventListener("click", function (event) {
    event.preventDefault();
    const span = button[i].getElementsByTagName("span");
    TweenMax.staggerFromTo(span, .9, {
      scale: 0,
      alpha: 1
    }, {
      scale: 250,
      yoyo: true,
      alpha: 0
    }, .2, eventReturn);

    function eventReturn() {
      const konteyner = document.getElementById("searchListItem" + i);
      button[i].innerText = "SEND";
      content.insertBefore(konteyner, content.firstChild);
      popup.className += " active";
      const popupContentHeight = popupContent.offsetHeight,
        popupContentWidth = popupContent.offsetWidth + popupContent.offsetLeft,
        popupContentAverageHeight = popupContentHeight / 2,
        popupContentAverageWidth = popupContentWidth / 2;
      popupContent.style.marginTop = -popupContentAverageHeight + "px";
      popupContent.style.marginLeft = -popupContentAverageWidth + "px";

      TweenMax.to(popupContent, 1, {
        scale: 1,
        yoyo: true,
        alpha: 1
      });

      document.getElementById("popup-close").addEventListener("click", function () {
        const searchList = document.getElementById("search-list"),
          insertBeforeElem = document.getElementById("searchListItem" + (i + 1));
        searchList.insertBefore(konteyner, searchList.insertBeforeElem);
        TweenMax.to(popupContent, 1, {
          scale: 0,
          yoyo: true,
          alpha: 0,
          onComplete: closePopup
        });

        function closePopup() {
          button[i].innerText = "CONTACT US";
          popup.className -= " active";
        }
      });

    }

  });
}