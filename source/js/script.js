if(window.matchMedia('(max-width: 767px)').matches) {
  mobileNav ();

  try {
    sliderOn();
  } catch {
  }
}

window.addEventListener("resize", function() {
  if (innerWidth <= 767) {
    mobileNav ();
    try {
      sliderOn();
    } catch {
    }
  }

  if (innerWidth > 767) {
    isNavNotMobile ();
  }
}, false);

function mobileNav () {
  var toggleButton = document.querySelector(".main-nav__toggle");
  var mainNav = document.querySelector(".main-nav");

  toggleButton.classList.remove("main-nav__toggle--no-js");
  toggleButton.classList.add("main-nav__toggle--closed");
  mainNav.classList.add("no-display");

  toggleButton.onclick = toggleSwitch;

  function toggleSwitch () {
    var isToggleClosed = document.querySelector(".main-nav__toggle--closed");

    if (isToggleClosed) {
      toggleButton.classList.remove("main-nav__toggle--closed");
      mainNav.classList.remove("no-display");
    } else {
      toggleButton.classList.add("main-nav__toggle--closed");
      mainNav.classList.add("no-display");
    }
  }
}

function sliderOn () {
  var buttonBefore = document.querySelector(".results-factoid__before-after-button--before");
  var buttonAfter = document.querySelector(".results-factoid__before-after-button--after");
  var toggle = document.querySelector(".results-factoid__toggle");
  var slides = document.querySelector(".results-slider__slides");

  buttonBefore.onclick = slideBefore;
  buttonAfter.onclick = slideAfter;

  function slideBefore() {
    if (slides.classList.contains("results-slider__slides--after")) {
      slides.classList.remove("results-slider__slides--after");
    }
    slides.classList.add("results-slider__slides--before");
    if (toggle.classList.contains("results-factoid__toggle--after")) {
      toggle.classList.remove("results-factoid__toggle--after");
    }
    toggle.classList.add("results-factoid__toggle--before");
  }

  function slideAfter() {
    if (slides.classList.contains("results-slider__slides--before")) {
      slides.classList.remove("results-slider__slides--before");
    }
    slides.classList.add("results-slider__slides--after");
    if (toggle.classList.contains("results-factoid__toggle--before")) {
      toggle.classList.remove("results-factoid__toggle--before");
    }
    toggle.classList.add("results-factoid__toggle--after");
  }
}

function isNavNotMobile () {
  var navNotMobile = document.querySelector(".main-nav");
  navNotMobile.classList.remove("no-display");
}
