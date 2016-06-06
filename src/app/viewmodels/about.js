/**
 * Viewmodel of About page
 *
 * @author Márton Sági
 * @version 1.0
 *
 * @module viewmodels/index
 * @requires services/viewmodel
 */
define(['services/viewmodel'], function (ViewModel) {

    /**
     * Kendo viewmodel
     * @type {kendo.observable}
     */
    var vm = ViewModel.extend({
        data: {},
        load: function (route) {
            var t = this;
            require(['json!data/about.json'], function (data) {
                t.set("data", data);
            });
        },
        unload: function () {
        }
    });

    return new vm();
});