'use strict';

var app = angular.module('TrackingSystemApp', ['google-maps', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '../Partials/Home/home.html',
                controller: 'LoginCtrl'
            }).
            when('/Content/Login', {
                templateUrl: '../Partials/User/homeLogin.html',
                controller: 'LoginCtrl'
            }).
            when('/Content/Register', {
                templateUrl: '../Partials/User/register.html',
                controller: 'RegisterCtrl'
            }).
            when('/Content/Admin', {
                templateUrl: '../Partials/Administration/adminPanel.html',
                controller: 'LoginCtrl'
            }).
            when('/Content/Paths/:id', {
                templateUrl: '../Partials/Paths/path.html',
                controller: 'PathCtrl'
            }).
            when('/Content/Admin/Users', {
                templateUrl: '../Partials/Administration/users.html',
                controller: 'UsersCtrl'
            }).
            when('/Content/Admin/:id', {
                templateUrl: '../Partials/Administration/adminPanel.html',
                controller: 'LoginCtrl'
            }).
            when('/admin', {
                templateUrl: '../Partials/Administration/adminPanel.html',
                controller: 'LoginCtrl'
            })
            .otherwise({
                templateUrl: '../Partials/Home/home.html',
                controller: 'LoginCtrl'
            })
    }])
    .value('toastr', toastr)
    .run(function ($timeout) {
        $(window).load(function () {
            $timeout(function () {
                var interval = setInterval(function () {
                    var elements = $('a.page-scroll');
                    if (elements.length > 2) {
                        addClickEvents();
                        clearInterval(interval);
                    }
                }, 500);                

                $(".section").css('min-height', $(window).height() + "px");

                // will first fade out the loading animation 
                $("#status").fadeOut("slow");

                // will fade out the whole DIV that covers the website. 
                $("#preloader").delay(500).fadeOut("slow").remove();

                /*====================================
                Show Menu on Book
                ======================================*/
                $(window).bind('scroll', function () {
                    var navHeight = $(window).height() - 100;
                    if ($(window).scrollTop() > navHeight) {
                        $('.navbar-default').addClass('on');
                    } else {
                        $('.navbar-default').removeClass('on');
                    }
                });

                $('body').scrollspy({
                    target: '.navbar-default',
                    offset: 80
                })

                $("#team").owlCarousel({

                    navigation: false, // Show next and prev buttons
                    slideSpeed: 300,
                    paginationSpeed: 400,
                    autoHeight: true,
                    itemsCustom: [
                                  [0, 1],
                                  [450, 2],
                                  [600, 2],
                                  [700, 2],
                                  [1000, 4],
                                  [1200, 4],
                                  [1400, 4],
                                  [1600, 4]
                    ],
                });

                $("#clients").owlCarousel({

                    navigation: false, // Show next and prev buttons
                    slideSpeed: 300,
                    paginationSpeed: 400,
                    autoHeight: true,
                    itemsCustom: [
                                  [0, 1],
                                  [450, 2],
                                  [600, 2],
                                  [700, 2],
                                  [1000, 4],
                                  [1200, 5],
                                  [1400, 5],
                                  [1600, 5]
                    ],
                });

                $("#testimonial").owlCarousel({
                    navigation: false, // Show next and prev buttons
                    slideSpeed: 300,
                    paginationSpeed: 400,
                    singleItem: true
                });

                /*====================================
                Portfolio Isotope Filter
                ======================================*/
                var portfolioInterval = setInterval(function () {
                    var elements = $('.portfolio-items');
                    if (elements.length > 0) {
                        initPortfolio();
                        clearInterval(portfolioInterval);
                    }
                }, 500); 

                //smoothScroll
                //smoothScroll.init();})
            })
        })

    })
    .constant('baseUrl', 'http://trackingsystemserverspringconf.apphb.com/');//'http://qrinformation.apphb.com');//http://qrinfo.apphb.com');//'http://localhost:1763');//'http://localhost:6364');//'http://QRInfoSystem.Web.Web.Web.Webserver.apphb.com/');

function addClickEvents() {
    $('a.page-scroll').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var hash = this.hash;
            var hashIndex = hash.indexOf('#');
            if (hash[hashIndex + 1] == '/') {
                hash = hash.replace('/', '');
                var newIndex = hash.indexOf('/');
                if (newIndex == -1) {
                    newIndex = hash.length
                }
                hash = hash.slice(0, newIndex);
            }
            var target = $(hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 40
                }, 900);
                //return true;
            }
        }
    });
}

function initPortfolio() {
    var $container = $('.portfolio-items');
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });
    $('.cat a').click(function () {
        $('.cat .active').removeClass('active');
        $(this).addClass('active');
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        return false;
    });



    /*====================================
    WOW JS
    ======================================*/

    new WOW().init();
}