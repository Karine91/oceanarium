$(function(){
    $(window).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event){
        if($(document).scrollTop() >=$('.gallery-shark-wrap').offset().top -$(window).innerHeight()){
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

//TODAY EVENTS CLOCK
    var session = $('.today-events_session-start');
    session.each(function(){
        var that = $(this);
        var clock_arrow = that.find('.today-events_session-clock__arrow');
        var event_time_str = that.find('.today-events_session-header__time').text();
        var event_time = event_time_str.trim().replace(/[.:]/, 'h');
        var event_time_hours = event_time.substring(0,event_time.indexOf('h'));
        var event_time_minutes = event_time.substring(event_time.indexOf('h')+1);
        var ev_time = parseFloat(event_time_minutes/60) + parseFloat(event_time_hours);
        if (ev_time>=12){
            ev_time -=12;
        }
        var degrees = ev_time*30;
        clock_arrow.css({'transform' : 'rotate('+ degrees +'deg)'});
    });

});

