/**
 * Viewmodel of 404 page
 *
 * @author Márton Sági
 * @version 1.0
 *
 * @module viewmodels/404
 * @requires services/viewmodel
 */
define(['services/viewmodel'], function (ViewModel) {

    /**
     * Kendo viewmodel
     * @type {kendo.observable}
     */
    var vm = ViewModel.extend({
        load: function (route) {
        },
        unload: function () {
        }

    });

    return new vm();
});