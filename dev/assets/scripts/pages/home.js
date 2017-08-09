"use strick";
const sliderAnim1 = document.getElementById("slider-effect1"),
  sliderAnim2 = document.getElementById("slider-effect2"),
  sliderImg = document.getElementById("slider-img"),
  sliderAnimItems = [];

sliderAnimItems.push(sliderAnim1);
sliderAnimItems.push(sliderAnim2);

TweenMax.set(sliderAnimItems, {
  rotationY: -10,
  rotationX: 50,
  scale: 2
});

TweenMax.staggerTo(sliderAnimItems, 3, {
  rotationY: 0,
  rotationX: 0,
  scale: 1,
  repeat: -1,
  autoAlpha: .5,
  ease: Power0.easeNone,
  yoyo: true
}, .2);

TweenMax.set(sliderImg, {
  rotationZ: 2
});


TweenMax.to(sliderImg, 8, {
  rotationZ: -2,
  repeat: -1,
  ease: Power0.easeNone,
  yoyo: true
});