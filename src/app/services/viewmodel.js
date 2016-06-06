/**
 * ViewModel base class
 * Global parameters and events
 *
 * @module services/viewmodel
 * @requires config
 * @requires services/ui
 *
 * @author Márton Sági
 * @version 1.0
 */
define(['config', 'services/ui'], function (config, UiHelper) {
    /**
     * @exports services/viewmodel
     */
    var ViewModel = kendo.data.ObservableObject.extend({
        /**
         * Pass base config to viewmodel
         * @type {object}
         */
        config: config,

        /**
         * Pass UI service to viewmodel
         * @type {object}
         */
        ui: UiHelper,

        route: null,

        /**
         * Called by AppRouter.loadView when view is loading
         * @param {object} route current route parameters and info
         * @return void or $.Deferred
         */
        load: function (route) { },

        /**
         * Called by AppRouter.loadView when view is unloaded
         * @param {object} route current route parameters and info
         * @return void
         */
        unload: function (route) { }
    });

    return ViewModel;
});
