/**
 * Viewmodel of Contact page
 *
 * @author Márton Sági
 * @version 0.1
 *
 * @module viewmodels/index
 * @requires services/ui
 */
define(['services/viewmodel'], function (ViewModel) {

    /**
     * Kendo viewmodel
     * @type {kendo.observable}
     */
    var vm = ViewModel.extend({
        name: "",
        nav: [],
        load: function (route) {
            var t = this;
            require(['json!data/layout.json'], function (data) {
                t.set("name", data.name);
                t.set("nav", data.nav);
            });
        },
        unload: function () {
            alert("unloaded");
        }
    });

    return new vm();
});