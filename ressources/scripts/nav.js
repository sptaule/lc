$(document).scroll(function () {
    var y = $(this).scrollTop();
    if (y > 215) {
        $("#scroll-menu").fadeIn(150);
        $("#side-menu").fadeOut(150);
        $("#external-links-menu").fadeOut(150);
    } else {
        $("#scroll-menu").fadeOut(150);
        $("#side-menu").fadeIn(150);
        $("#external-links-menu").fadeIn(150);
    }
});