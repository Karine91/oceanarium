function centeredBottomElement(container, element){
    var containerHeight = container.outerHeight();
    var containerWidth = container.outerWidth();
    var elementHeight = element.outerHeight(true)+21;
    var positionElementTextTop = containerHeight-35-elementHeight;
    var positionElementTextLeft = containerWidth/2;
    var elementWidth = element.outerWidth();
    positionElementTextLeft -= elementWidth/2;
    var position = positionElementTextTop+","+positionElementTextLeft;
    element.attr('data-position',position);
}


jQuery(window).load(function(){
    //Slider
    //Посчитаем позицию нижнего блока первый слайд

    var slider = $('.slider_block');
    var slideElement = $('.slider_block__text_bottom');


    $(window).resize(function(){
        var windowHeight = $(window).outerHeight();
        var windowWidth = $(window).width();
        console.log(windowWidth);
        console.log(windowHeight);
    });
    var windowHeight = $(window).outerHeight();
    var windowWidth = $(window).width();
    var dimensions = windowWidth +"," + windowHeight;
    var fishPosition = windowHeight*0.45 +","+ windowWidth*1.2;


    var elementFish = $('.slider_block__image_fish');
    elementFish.attr('data-position',fishPosition);


    centeredBottomElement(slider,slideElement);

    //Init slider
    slider.fractionSlider({
        'fullWidth': 			true,
        'controls': 			true,
        'pager': 				false,
        'slideEndAnimation':    true,
        'responsive':  			true,
        'dimensions':  			dimensions

    });

});