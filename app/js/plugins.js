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


    // $(window).resize(function(){
    //     centered(slideElement);
    // });

    ///SLIDE 1
    var fishPosition = percentToPixelVert(50) +","+ percentToPixelHoryz(101);
    var maintextPosition = percentToPixelVert(40)+","+ 0;
    var elementFish = $('.slider_block__image_fish');
    var elemMaintext = $('.slider_block__maintext');
    elementFish.attr('data-position',fishPosition);
    elemMaintext.attr('data-position',maintextPosition);
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

//ONEPAGE-SCROLL

    $(".main").onepage_scroll({
        sectionContainer: ".section-page",     // sectionContainer accepts any kind of selector in case you don't want to use section
        easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
                                         // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
        animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
        pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
        updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
        beforeMove: function(index) {},  // This option accepts a callback function. The function will be called before the page moves.
        afterMove: function(index) {},   // This option accepts a callback function. The function will be called after the page moves.
        loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
        keyboard: true,                  // You can activate the keyboard controls
        responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
        // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
        // the browser's width is less than 600, the fallback will kick in.
        direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".
    });
    var galleryShark = $('.gallery-shark');
    try {
        galleryShark.ripples({
            resolution: 512,
            dropRadius: 20, //px
            perturbance: 0.01,
            interactive: true
        });
    $('.gallery-shark__btn').on('mouseover', function(event){
        galleryShark.ripples('set', 'interactive', false);
        galleryShark.addClass('gallery-shark-scale');

    }).on('mouseleave', function(event){
        galleryShark.ripples('set', 'interactive', true);
        galleryShark.removeClass('gallery-shark-scale');
        });
    }
    catch (e) {
        $('.error').show().text(e);
    }

    // Automatic drops
    setInterval(function() {
        var $el = galleryShark;
        var x = Math.random() * $el.outerWidth();
        var y = Math.random() * $el.outerHeight();
        var dropRadius = 20;
        var strength = 0.03 + Math.random() * 0.03;
        $el.ripples('drop', x, y, dropRadius, strength);
    }, 2000);



});