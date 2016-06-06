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
        conf: '',
        size: '',
        routes: [],
        load: function (route) {
            var t = this,
                result = [];

            $.each(this.router.routes, function (i, r) {
                var route = JSON.parse(JSON.stringify(r));
                if ($.isArray(route.name)) {
                    route.name = route.name.join(', ');
                }
                route.viewModel = t.config.viewModel.basePath + route.viewModel + ".js";
                result.push(route);
            });

            t.set("routes", result);
            t.set("conf", JSON.stringify(t.config));
            t.set("size", t.ui.getSizeClass());

            $(window).on("resize", function () {
                t.set("size", t.ui.getSizeClass());
            });
        },
        unload: function () {
        }

    });

    return new vm();
});