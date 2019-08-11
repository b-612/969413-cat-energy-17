if(window.matchMedia('(max-width: 767px)').matches) {
  sliderOn ();
}

window.addEventListener("resize", function() {
  if (innerWidth <= 767) {
    sliderOn ();
  }
}, false);

function sliderOn () {
  var buttonBefore = document.querySelector(".results-factoid__before-after-text--before");
  var buttonAfter = document.querySelector(".results-factoid__before-after-text--after");
  var toggle = document.querySelector(".results-factoid__toggle");
  var slides = document.querySelector(".results-factoid__slides");

  buttonBefore.onclick = slideBefore;
  buttonAfter.onclick = slideAfter;

  function slideBefore() {
    if (slides.classList.contains("results-factoid__slides--after")) {
      slides.classList.remove("results-factoid__slides--after");
    }
    slides.classList.add("results-factoid__slides--before");
    if (toggle.classList.contains("results-factoid__toggle--after")) {
      toggle.classList.remove("results-factoid__toggle--after");
    }
    toggle.classList.add("results-factoid__toggle--before");
  }

  function slideAfter() {
    if (slides.classList.contains("results-factoid__slides--before")) {
      slides.classList.remove("results-factoid__slides--before");
    }
    slides.classList.add("results-factoid__slides--after");
    if (toggle.classList.contains("results-factoid__toggle--before")) {
      toggle.classList.remove("results-factoid__toggle--before");
    }
    toggle.classList.add("results-factoid__toggle--after");
  }
}
