/**
 * Container for miscellaneous global jquery functions
 * A fixed place for the inevitable custom quirks
 *
 * @author Márton Sági
 * @version 0.1
 *
 * @module services/global
 * @requires config
 */
define(['config'], function (config) {

    /**
     * global jquery things
     */
    var load = function () {
        $(function () {
        });
    };
    
    var onRouteChange = function (e) {
        var navbar = $('#navbar');
        navbar.collapse('hide');

        var url = config.pushState === true ? e.url : (e.url === '' ? '#'+e.url : e.url);
        var active = navbar.find('a[href="' + url + '"]').parent();
        navbar.find('li').removeClass("active");
        active.addClass('active');
    };

    var navigateOnClick = function (e) {
        var navbar = $('#navbar');
        navbar.collapse('hide');

    };

    return {
        load: load,
        navigateOnClick: navigateOnClick,
        onRouteChange: onRouteChange
    };
});