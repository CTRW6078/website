//============================== Cut the Red Wire - page scripts =========================
// Trimmed from the Frog Force template's custom.js + FFmods/mods.js. Same behaviors:
// hero carousel, sticky header, nested dropdowns, sponsor logo slider, click-to-play video,
// scroll-in animations, and the kickoff countdown.

jQuery(document).ready(function ($) {
    'use strict';

    // placeholder links
    $('a[href="#"]').on('click', function (e) { e.preventDefault(); });

    //============================== hero slider =========================
    $('.banner').carousel({ interval: 5000 });

    //============================== sticky header (template) =========================
    $(window).load(function () {
        $('.body-wrapper').each(function () {
            var header_area = $('.header-wrapper');
            var main_area = header_area.children('.header');
            var navigation = main_area.find('.navbar-collapse');
            var original = { nav_top: navigation.css('margin-top') };

            $(window).scroll(function () {
                if (main_area.hasClass('bb-fixed-header') && ($(this).scrollTop() === 0 || $(this).width() < 750)) {
                    main_area.removeClass('bb-fixed-header').appendTo(header_area);
                    navigation.animate({ 'margin-top': original.nav_top }, {
                        duration: 300, queue: false, complete: function () { header_area.css('height', 'auto'); }
                    });
                } else if (!main_area.hasClass('bb-fixed-header') && $(this).width() > 750 &&
                    $(this).scrollTop() > header_area.offset().top + header_area.height() - parseInt($('html').css('margin-top'), 10)) {
                    header_area.css('height', header_area.height());
                    main_area.css({ 'opacity': '0' }).addClass('bb-fixed-header');
                    main_area.appendTo($('body')).animate({ 'opacity': 1 });
                    navigation.css({ 'margin-top': '0px' });
                }
            });
        });
        $(window).trigger('resize');
        $(window).trigger('scroll');
    });

    //============================== nested dropdown menus (template) =========================
    $('.navbar a.dropdown-toggle').on('click', function () {
        var elmnt = $(this).parent().parent();
        if (!elmnt.hasClass('nav')) {
            var li = $(this).parent();
            var heightParent = parseInt(elmnt.css('height').replace('px', ''), 10) / 2;
            var widthParent = parseInt(elmnt.css('width').replace('px', ''), 10) - 10;
            li.toggleClass('open');
            $(this).next().css('top', heightParent + 'px');
            $(this).next().css('left', widthParent + 'px');
            return false;
        }
    });

    //============================== sponsor logo slider =========================
    $('.owl-carousel.partnersLogoSlider').owlCarousel({
        loop: true,
        margin: 28,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        nav: true,
        dots: false,
        smartSpeed: 500,
        responsive: {
            320: { slideBy: 1, items: 1 },
            480: { slideBy: 1, items: 2 },
            768: { slideBy: 1, items: 3 },
            992: { slideBy: 1, items: 5 }
        }
    });

    //============================== click-to-play team video =========================
    $('.videoLeft img').click(function () {
        var video = '<iframe width="550" height="368" src="' + $(this).attr('data-video') +
            '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        $(this).replaceWith(video);
    });

    //============================== scroll-in animations =========================
    new WOW().init();

    //============================== countdown =========================
    // FTC BIOBUZZ kickoff: Saturday, September 12, 2026, 12:00 pm ET.
    // Change these five numbers to point the clock at a different date.
    $('#simple_timer').syotimer({
        year: 2026,
        month: 9,
        day: 12,
        hour: 12,
        minute: 0
    });
});
