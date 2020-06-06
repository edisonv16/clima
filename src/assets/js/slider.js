$(function(){
  $('.bxslider').bxSlider({
    mode: 'fade',
    speed: 500,
    randomStart:true
  });
});

$(function(){
  $('.bxcarrusel').bxSlider({
    mode: 'horizontal',
    maxSlides:5,
    minSlides:1,
    moveSlides:1,
    slideWidth:200,
    randomStart:true,
    responsive:true
  });
});