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

  buttonBefore.onclick = slideBefore;
  buttonAfter.onclick = slideAfter;

  function slideBefore() {
    var toggle = document.querySelector(".results-factoid__toggle");
    var isBefore = document.querySelector(".results-factoid__toggle--before");
    var imageBefore = document.querySelector(".results-factoid__image--before");
    var imageAfter = document.querySelector(".results-factoid__image--after");
    if (!isBefore) {
      imageAfter.classList.add("no-display");
      imageBefore.classList.remove("no-display");
      toggle.classList.remove("results-factoid__toggle--after");
      toggle.classList.add("results-factoid__toggle--before");
    }
  }

  function slideAfter() {
    var toggle = document.querySelector(".results-factoid__toggle");
    var isAfter = document.querySelector(".results-factoid__toggle--after");
    var imageBefore = document.querySelector(".results-factoid__image--before");
    var imageAfter = document.querySelector(".results-factoid__image--after");
    if (!isAfter) {
      imageBefore.classList.add("no-display");
      imageAfter.classList.remove("no-display");
      toggle.classList.remove("results-factoid__toggle--before");
      toggle.classList.add("results-factoid__toggle--after");
    }
  }
}
