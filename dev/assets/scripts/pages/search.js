const button = document.querySelectorAll(".button"),
  tl = new TimelineMax();

for (let i = 0; i < button.length; i++) {

  button[i]
    .addEventListener("click", function (event) {
      const span = button[i].getElementsByTagName("span");
      tl.staggerFrom(span, .75, {
        x: event.offsetX,
        y: event.offsetY,
        scale: 20,
        ease: Power0.easeNone,
        yoyo: true,
        alpha: 1
      }, .5);

    });
}