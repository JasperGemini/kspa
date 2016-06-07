/**
 * Application bootstrap
 * Contains basic init tasks, e.g.: router configuration, global event handlers, etc..
 * 
 * @author Márton Sági
 * @version 0.1
 * 
 * @module app
 * @requires services/router
 * @requires services/global
 * @requires config
 */
define(['services/router', 'services/global', 'services/ui', 'config'], function (Router, Global, ui, config) {

    /**
     * @constructor
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
            })
            .event("onRouteMissing", function (e) {
                console.log("Route is missing: " + e.url);
                this.handle404();
            })
            .event("navigateOnClick", function (e) {
                Global.navigateOnClick(e);

                return true;
            })
            .event("beforeLoadView", function (route, view, viewModel) {
                ui.loader(true);
            })
            .event("afterLoadView", function (route, view, viewModel) {
                setTimeout(function () {
                    ui.loader(false);
                }, 750);
            });

        router.start();
        //-
    };

    return /* @alias module:app */ new App();
});