$('.carousel').carousel({ interval: false });
// alert($('.approach_img').css('height'))
// alert($('.laptop_book').css('width'))
var tl = new TimelineMax();
var notebook = $('#notebook');
var rectangle = $('#rectangle');
var grafic = $('#grafic');
var item = $('#item');
var mes = $('#mes');
var line = $('#line');
var plus = $('#plus');
var search = $('#search');
var diagram = $('#diagram');
var like = $('#like');
var like2 = $('#like2');
var like3 = $('#like3');
var phone = $('#phone');
var mouse = $('.mouse');
tl
.from(phone, 0.4, {opacity:0, transform:"translateY(-70px)"}, 0.3)
.from(notebook, 0.4, {opacity:0, transform:"translateY(-70px)"}, 0.3)
.from(item, 0.9, {opacity:0, transform:"translate(-130px,-100px)"}, 0.8)
.staggerFrom([diagram,search], 0.9, {opacity:0, transform:"translate(-130px,-100px)"}, 0.8)
.staggerFrom([like,like2,like3], 0.9, {opacity:0, transform:"translate(-140px,-100px)"}, 0.4)
.from(mes, 0.7, {opacity:0, transform:"translateY(-70px)"}, 0.7)
.from(grafic, 0.9, {opacity:0, transform:"translate(140px,100px)"}, 0.8)
.from(mouse, 0.3, {opacity:0}, 3);

var l_slider = $(".works_header").length;
var item = $('#worksSliderText').find('.carousel-item');
function nextSlide(){
  var temp_slider = $('.carousel-indicators>li.active').attr('data-slide-to');
  if(temp_slider>l_slider-1) temp_slider = 0;
  $('#worksSliderText>.carousel-inner>.active').removeClass('active');
  item.eq(temp_slider).addClass('active');
}
function prevSlide(){
  var temp_slider = $('.carousel-indicators>li.active').attr('data-slide-to');
  if(temp_slider<0) temp_slider = l_slider-1;
  $('#worksSliderText>.carousel-inner>.active').removeClass('active');
  item.eq(temp_slider).addClass('active');
}

$('.carousel-control-next').click(function(){
setTimeout(nextSlide, 300);
});
$('.carousel-control-prev').click(function(){
  setTimeout(prevSlide, 300);
});
$('.carousel-indicators>li').click(function(){
  var slide = $(this).attr('data-slide-to');
  $('#worksSliderText>.carousel-inner>.active').removeClass('active');
  item.eq(slide).addClass('active');
});
var header = $(".navbar");
var scrollPrev = 0;
$(window).scroll(function() {
  var scrolled = $(window).scrollTop(); 
  var firstScrollUp = false; 
  var firstScrollDown = false; 
  if ( scrolled > 0 ) {
    if ( scrolled > scrollPrev ) {
      firstScrollUp = false; 
      if ( scrolled < header.height() + header.offset().top ) {
        if ( firstScrollDown === false ) {
          var topPosition = header.offset().top; 
          header.css({
            "top": topPosition + "px"
          });
          firstScrollDown = true;
        }
        header.css({
          "position": "absolute"
        });
      } else {
        header.css({
          "position": "fixed",
          "top": "-" + header.height() + "px"
        });
      }
    } else {
      firstScrollDown = false; 
      if ( scrolled > header.offset().top ) {
        if ( firstScrollUp === false ) {
          var topPosition = header.offset().top; 
          header.css({
            "top": topPosition + "px"
          });
          firstScrollUp = true;
        }
        header.css({
          "position": "absolute"
        });
      } else {
        header.removeAttr("style");
      }
    }
    scrollPrev = scrolled;
    if( scrolled > 500){
      $('.up').show();      
    }else{
      $('.up').hide();  
    }
  } 
});     
$(document).ready(function(){
  $(".navbar-nav").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1500);
  });
  $(".scroll-link").on("click", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1500);
  });
  $(".up").on("click", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1500);
  });
});

$('.nav-link').click(function(){
  $('.navbar-collapse').removeClass('show');
});