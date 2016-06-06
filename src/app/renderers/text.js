/**
 * Text Renderer
 * Uses requirejs-text plugin
 * Default implementation of renderers/base
 *
 * @module renderers/text
 * @requires renderers/base
 *
 * @author Márton Sági
 * @version 1.0
 */
define(['renderers/base'], function (RendererBase) {
    var RendererText = RendererBase.extend({
        engine: 'text',
        render: function (route) {
            var t = this,
                promise = $.Deferred(),
                tplEngine = route.engine || t.config.layout.defaultEngine,
                templateUrl = tplEngine +
                              '!' +
                              (t.config.pushState == true ? t.config.baseUrl.substring(1) : t.config.baseUrl) +
                              route.templateUrl;

            /**
             * dynamic view
             * ------------
             * if the route has a viewmodel specified
             */
            if ("viewModel" in route && $.type(route.viewModel) == "string") {
                var viewModelUrl = t.config.viewModel.basePath + route.viewModel;

                require([templateUrl, viewModelUrl], function (view, vm) {

                    /**
                     * @example This is the place where custom templating could be used in a new renderer
                     */

                    promise.resolve({ "view": view, "viewModel": vm });
                });
            }
            /**
             * static view
             * -----------
             * else load the view vithout any viewmodel
             */
            else {
                require([templateUrl], function (view) {

                    /**
                     * @example This is the place where custom templating could be used in a new renderer
                     */

                    promise.resolve({ "view": view, "viewModel": {} });
                });
            }

            return promise;
        }
    });

    return new RendererText();
});