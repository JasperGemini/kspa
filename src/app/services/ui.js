/**
 * UI helper functions
 *
 * @author Márton Sági
 * @version 1.0
 *
 * @module viewmodels/index
 * @requires services/config
 */
define(['config'], function (config) {

    /**
     * @constructor
     * @alias module:services/ui
     */
    var UiHelper = function () {
        var t = this;

        // descending order is important
        t.sizes = [
            { 'name': 'lg', 'size': 1200 },
            { 'name': 'md', 'size': 992 },
            { 'name': 'sm', 'size': 768 }
        ];
    };

    /**
     * Handles loader animation/text while navigating between pages
     * @param visible
     */
    UiHelper.prototype.loader = function (visible) {
        var loader = $(config.layout.loaderSelector);

        loader.toggle(visible);
    };

    /**
     * Bootstrap-specific function
     * Returns the actual screen-size in bootstrap definition
     *
     * @returns {string}
     */
    UiHelper.prototype.getSizeClass = function () {
        var t = this;

        for (i = 0; i < t.sizes.length; ++i) {
            var item = t.sizes[i];
            if (window.matchMedia('(min-width: ' + item.size + 'px)').matches) {
                return item.name;
            }
        }

        return 'xs';
    };

    return new UiHelper();
});
