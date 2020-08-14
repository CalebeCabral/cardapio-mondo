$(document).ready(function () {
  init();
});

// INIT
function init() {
  scrollSpy();
  navIndicator.init();
  navPosition.stickyNav();
}

// HANDLERS
$(".nav-categorias ul li").on("click", function (e) {
  e.preventDefault();
  scrollAnchor($(this));
});

$(window).on("scroll", function () {
  navPosition.stickyNav();
  scrollSpy();
});

// Functions
const navIndicator = {
  indicator: $(".indicador"),
  init() {
    const elem = $(".nav-categorias ul li.active");
    this.indicator.css("left", this.setPos(elem));
    console.log("Init")
  },
  move(elem) {
    this.indicator.css("left", this.setPos(elem));
  },
  setPos(elem) {
    const left = Math.round(elem[0].offsetLeft),
      middle = Math.round(elem.outerWidth() / 2);

    const indicatorPos = left + middle;

    return indicatorPos;
  }
}

const navPosition = {
  navOffset: $("nav.nav-categorias")[0].offsetTop,
  stickyNav() {
    if ($("html").scrollTop() > this.navOffset) {
      $("header").addClass("fixed-nav-categorias");
    } else {
      $("header").removeClass("fixed-nav-categorias");
    }
  }
}

function scrollAnchor(self) {
  const navIndex = self.index(),
    windowOffset = $("main .categoria").eq(navIndex).find(".cat-anchor").offset().top;

  $("html").animate({
    scrollTop: windowOffset
  }, 400);
}

function scrollSpy() {
  let categorias = [];
  let current;

  $("main .categoria").each(function (i) {
    if ($(this).offset().top <= $(window).scrollTop() + 60) {
      categorias[i] = this;
      current = categorias.length - 1;
    }
  });

  if (current == undefined) current = 0;

  if (!$(".nav-categorias ul li").eq(current).hasClass("active")) {
    $(".nav-categorias ul li").removeClass("active")
    $(".nav-categorias ul li").eq(current).addClass("active");
    navIndicator.move($(".nav-categorias ul li.active"));
    navFocus();
  }
}

function navFocus() {
  $(".nav-categorias").animate({
    scrollLeft: $(".nav-categorias ul li.active").offset().left - 50
  }, 200);
}
