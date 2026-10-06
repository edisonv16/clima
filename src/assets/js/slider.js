$(function() {
  var slider = $('.bxslider').bxSlider({
    mode: 'fade',
    speed: 500,
    randomStart: true,
    controls: false
  });

  $('#slider-prev').on('click', function(e) {
    e.preventDefault();
    slider.goToPrevSlide();
  });

  $('#slider-next').on('click', function(e) {
    e.preventDefault();
    slider.goToNextSlide();
  });
});