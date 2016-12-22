/**
 * Created by kym on 2016/12/15.
 */
$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        items:1,
        loop:true,
        center:true,
        autoplay:true,
        dots:false,
        autoplayTimeout:1500,
        URLhashListener:true,
        autoplayHoverPause:true,
        startPositiom:'URLHash'
    })

})
