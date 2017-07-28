var windowHeight = $(window).outerHeight();
var windowWidth = $(window).width();
var contentContainerWidth = 1170;
var contentContainerLeft = (windowWidth - contentContainerWidth)/2;
var contentContainerRight = contentContainerLeft + contentContainerWidth;
function centeredBottomElement(element){

    var positionElementTextTop = windowHeight-(element.outerHeight()+21)/2-35;
    var positionElementTextLeft = windowWidth/2;
    var position = positionElementTextTop+","+positionElementTextLeft;
    element.attr('data-position',position);
    centered(element);
}

function centered(element){
    var elementWidthHalf = element.outerWidth()/2;
    var elementHeightHalf = (element.outerHeight()+21)/2;
    element.css('margin-left', "-"+elementWidthHalf+"px");
    element.css('margin-top', "-"+elementHeightHalf+"px");
}
function percentToPixelVert(val){
    return val/100*windowHeight;
}
function percentToPixelHoryz(val){
    return val/100*windowWidth;
}
jQuery(window).load(function(){
    //Slider
    //Посчитаем позицию нижнего блока первый слайд

    var slider = $('.slider_block');
    var slideElement = $('.slider_block__text_bottom');


    $(window).resize(function(){
        centered(slideElement);
    });

    ///SLIDE 1
    var fishPosition = percentToPixelVert(50) +","+ percentToPixelHoryz(101);
    var elementFish = $('.slider_block__image_fish');
    elementFish.attr('data-position',fishPosition);
    centeredBottomElement(slideElement);
    ///SLIDE 2


    var textItems = $('.slider_block__text_item');
    var positionTop= percentToPixelVert(50);
    textItems.each(function(){
        var that = $(this);
        var itemWidth = that.outerWidth();
        var itemHeight = that.outerHeight();
        var positionLeft = contentContainerRight -itemWidth;
        var position = positionTop+","+ positionLeft;
        that.attr('data-position',position);
        positionTop +=10+itemHeight;
    });


    ///SLIDE 3

    var fish1_slide3 = $('.slider_block__image_fish1-slide3');
    fishPosition = percentToPixelVert(50) +","+ percentToPixelHoryz(101);
    fish1_slide3.attr('data-position',fishPosition);

    var fish2_slide3 = $('.slider_block__image_fish2-slide3');
    fishPosition = percentToPixelVert(10) +","+ percentToPixelHoryz(-40);
    fish2_slide3.attr('data-position',fishPosition);

    var fish3_slide3 = $('.slider_block__image_fish3-slide3');
    fishPosition = percentToPixelVert(90) +","+ percentToPixelHoryz(-40);
    fish3_slide3.attr('data-position',fishPosition);

    //Init slider
    slider.fractionSlider({
        'fullWidth': 			true,
        'controls': 			true,
        'pager': 				false,
        'slideEndAnimation':    true
        // 'responsive':  			true,
        // 'dimensions':  			containerWidth+","+containerHeight

    });

});