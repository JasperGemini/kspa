/**
 * Renderer base class
 * Global parameters and functions
 *
 * @module renderers/base
 * @requires config
 *
 * @author Márton Sági
 * @version 1.0
 */
define(['config'], function (config) {

    var RendererBase = kendo.Class.extend({
        engine: null,
        config: config,
        render: function (route) {
            var promise = $.Deferred();
            promise.resolve({"view": "", "viewModel": {}});

            return promise;
        }
    });

    return RendererBase;
});