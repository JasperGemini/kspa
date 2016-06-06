/**
 * Application bootstrap
 * Contains basic init tasks, e.g.: router configuration, global event handlers, etc..
 * 
 * @author Márton Sági
 * @version 1.0
 * 
 * @module app
 * @requires services/router
 * @requires services/quirks
 * @requires config
 */
define(['services/router', 'services/global', 'config'], function (Router, Global, config) {

    /**
     * Bootstrapper
     */
    var App = function () {
    };

    /**
     * Starting the application
     */
    App.prototype.start = function () {
        // global jquery things
        Global.load();

        // set default locale
        kendo.culture(config.culture);

        //+ setup router
        var router = new Router();

        router
            .event("onRouteChange", function (e) {
                Global.onRouteChange(e);
            })
            .event("onRouteBack", function (e) {
                console.log(e);
            })
            .event("onRouteMissing", function (e) {
                console.log("Route is missing: " + e.url);

                /**
                 * using kendoRouter.navigate to get the 404 page would cause confusion in back-navigation,
                 * our loadRoute() method comes handy in this case
                 */
                this.loadRoute(config.router.notFoundRoute);
            })
            .event("navigateOnClick", function (e) {
                Global.navigateOnClick(e);

                return true;
            })
            .event("beforeLoadView", function (route, view, viewModel) {
            });

        router.start();
        //-
    };

    return /* @alias module:app */ new App();
});