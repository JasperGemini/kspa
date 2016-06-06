/**
 * Application configurations
 * Global parameters and events
 *
 * @module config
 * @see module:app
 *
 * @author Márton Sági
 * @version 1.0
 */
define([], function () {
    /**
     * @exports config
     */
    var config = {
        /**
         * Relative base path of app, url-part after domain address (http://<domain.address><baseUrl>)
         * Starting slash is required when baseUrl is not empty
         * @type {string}
         * @property
         */
        baseUrl: '',

        /**
         * Base HTML Title, page titles will be appended to this
         * @type {string}
         */
        baseTitle: null,

        /**
         * Kendo culture setting
         * @type {string}
         */
        culture: 'en',

        /**
         * Use history pushState API or not
         * @type {boolean}
         */
        pushState: false,

        /**
         * @todo Please-wait.js integration
         * @type {boolean}
         */
        splash: false,

        /**
         * kendo.Router settings and default routes
         * @type {object}
         */
        router: {
            /**
             * 404 route
             * @type {string}
             */
            notFoundRouteName: "404",

            /**
             * URL of local (json) route definitions
             * @type {string}
             */
            localRoutes: "data/routes.json",

            /**
             * URL of remote route definitions
             * @type {string}
             */
            remoteRoutes: null,

            /**
             * jQuery selectors for links that should be handled by kendo.Router
             * @type {string}
             */
            routerHandledLinkClasses: '#navbar a, a.spa'
        },

        /**
         * kendo.Layout settings and view rendering parameters
         * @type {object}
         */
        layout: {
            /**
             * HTML template of the content-wrapper
             * @type {string}
             * @todo ability to use template selectors instead of hardcoded wrapper
             */
            template: 'views/layout.html',

            templateViewModel: 'viewmodels/layout',

            /**
             * Content root of rendered views
             */
            contentSelector: '#content',

            /**
             * Main wrapper selector
             * @type {string}
             */
            containerSelector: '#main-container',

            /**
             * Selector of loader animation/text
             * @type {string}
             */
            loaderSelector: '.router-loader',

            /**
             * RequireJS plugin used to load html page templates
             * @type {string}
             * @todo support for more engines
             */
            defaultEngine: 'text'
        },

        /**
         * Viewmodel settings
         * @type {object}
         */
        viewModel: {
            /**
             * Without starting slash! RequireJS style path (e.g.: viewmodels/home/index)
             * @type {string}
             */
            basePath: 'viewmodels/',

            /**
             * RequireJS plugin name to handle view html files
             * @type {string}
             */
            format: "text!",

            /**
             * Indicates whether the rendered views should be destroyed on route change or not
             * @todo not yet implemented!
             */
            destroyOnChange: false
        }
    };

    return config;
});