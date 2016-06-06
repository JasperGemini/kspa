/**
 * Viewmodel of Home page
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
        load: function (route) {
        },
        unload: function () {
        }

    });

    return new vm();
});