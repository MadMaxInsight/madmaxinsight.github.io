/*Инициализация классов для точек:*/
$('.dot').click(function(){
  $('.dot_active').addClass('dot');
  $('.dot_active').removeClass('dot_active');
  $(this).addClass('dot_active');
  $(this).removeClass('dot');
});
$('.dot_active').click(function(){
  $('.dot_active').addClass('dot');
  $('.dot_active').removeClass('dot_active');
  $(this).addClass('dot_active');
  $(this).removeClass('dot');
});
var s = 0; //reviews miniature photo global

function long(className){
  var long = $(className).css('width');
  var reg = new RegExp("[0-9]+","i") ;
  var res = reg.exec(long);
  return res;
}

var res = long('.slider_block');
var reviews_width = long('.reviews_block_slider_0');
var main_width = long('.reviews');

/*Отзывы:*/
/*сохранение миниатюры при переключении точек:*/
var listTemp = 0;
var temp = {
  'temp0' : 0,
  'temp1' : 0,
  'temp2' : 0,
};
function reviewsSwitch(l){
temp['temp' + listTemp] = s;
listTemp = l; 
s = temp['temp' + l];
var x = main_width*l;
$('.reviews_row').css({'transform' : "translateX(-" + x + "px)"});
}
$('.reviews_arrow_n').click(function(){
  if(s<2) s++;
  var g = s*reviews_width;
  $(this).parent().find('ul').css({'transform' : "translateX(-" + g + "px)"});
});

$('.reviews_arrow_b').click(function(){
  if(s>0) s--;
  var g = s*reviews_width;
  $(this).parent().find('ul').css({'transform' : "translateX(-" + g + "px)"});
});

/*Портфолио:*/
var n = 0;

function switcher(b){ // по нажатию на миниатюру вывод в большой слайдер
  n=b;
  var p = res*n;
  $('.slider_item').css({'transform' : "translateX(-" + p + "px)"});
}

/*большой слайдер:*/
$('#arrow_n').click(function(){
  if(n<9){
    n++;
  }else{
    $('#stop_n').show();
    setTimeout(stop_n, 150);
    function stop_n(){
      $('#stop_n').css({'display' : 'none'});
    }
  }
  var p = res*n;
  $('.slider_item').css({'transform' : "translateX(-" + p + "px)"});
});

$('#arrow_b').click(function(){
  if(n>0){
    n--;
  }else{
    $('#stop_b').show();
    setTimeout(stop_b, 150);
    function stop_b(){
      $('#stop_b').css({'display' : 'none'});
    }
  }
  var p = res*n;
  $('.slider_item').css({'transform' : "translateX(-" + p + "px)"})
});

/*popups*/
$('.primary_buttons_call').click(function(){
  $('.popup').toggle();
});
$('.close').click(function(){
  $('.popup').toggle();
});

$('#nav_invisible>.nav-items>.nav-item').click(function(){
  $('#nav_invisible').toggle();
  $('.top_button').toggleClass('top_button_active');

});

// $('.nav-item>a').click(function(){
// // $("#top_nav").on("click","a", function (event) {
//   //отменяем стандартную обработку нажатия по ссылке
//   event.preventDefault();

//   //забираем идентификатор бока с атрибута href
//   var id  = $(this).attr('href'),

//   //узнаем высоту от начала страницы до блока на который ссылается якорь
//     top = $(id).offset().top;
  
//   //анимируем переход на расстояние - top за 1500 мс
//   $('body,html').animate({scrollTop: "300px" }, 1500);
//   // $('body,html').scrollTop(top);
// });
