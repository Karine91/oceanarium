$(function(){
    $(window).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event){
        if($(document).scrollTop() ==$('.gallery-shark-wrap').offset().top -$(window).innerHeight()){
           setTimeout(function(){
               $('.gallery-shark__text .section_header').animate({
                   opacity: "1"
               },2500,"easeOutQuart", function(){
                   $('.gallery-shark__btn').animate({
                       opacity: "1"
                   },1000);
               });
           }, 1000);
        }
    });




});

