$(document).ready(function ($) {
    $('#adongular-app').addClass('preloader-site');
});

$(window).on('load', function () {
    $('.preloader-wrapper').fadeOut();
    $('#adongular-app').removeClass('preloader-site');
});