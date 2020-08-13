$(document).ready(function () {
  navIndicator.init();
});

$(".nav-categorias ul li").on("click", function () {
  navIndicator.move($(this));
});

const navIndicator = {
  indicator: $(".indicador"),
  init() {
    const elem = $(".nav-categorias ul li").eq(0);
    this.indicator.css("left", this.setPos(elem))
  },
  move(elem) {
    navIndicator.indicator.animate({
      left: this.setPos(elem)
    }, 300);
  },
  setPos(elem) {
    const left = Math.round(elem[0].offsetLeft),
      middle = Math.round(elem.outerWidth() / 2);

    const indicatorPos = left + middle;

    return indicatorPos;
  }
}
