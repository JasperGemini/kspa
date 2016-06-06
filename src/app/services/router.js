/**
 * Router service
 * Handles SPA routing/navigation and page loading
 * 
 * Page loading: 
 * -------------
 * Using RequireJS to load html and JS resources
 * Using Kendo html templates
 * 
 * Dynamic route data defines html layouts + assigned js viewmodels
 * 
 * When a route is matched, router loads in the html template (view), 
 * after that the specified js resource (viewmodel) will be assigned to the html template
 * 
 * ViewModel.load():
 * -----------------
 * If the viewmodel contains a "load" method, it will be fired first when page is loading.
 * This should be used for view-specific initializations
 * 
 * Navigation:
 * -----------
 * Router handles specific navigation links only
 * Navigation links can be router-handled links or "hard-links" what the browser will load normally
 * 
 * @module services/router
 * @see module:app 
 * @see module:services/router
 * @requires module:config
 * 
 * @author Márton Sági
 * @version 1.0
 */
define(['config'], function (config) {

    /**
     * @constructor
     * @alias module:services/router
     */
    var Router = function () {
        var t = this;

        /**
         * Available global events of router and views
         * @property
         * @type {object}
         */
        t.events = {
            /**
             * kendo.Router change event
             * @param {object} e
             */
            onRouteChange: function (e) { },

            /**
             * kendo.Router back event
             * @param {object} e
             */
            onRouteBack: function (e) { },

            /**
             * kendo.Router routeMissing event
             * @param {object} e
             */
            onRouteMissing: function (e) { },

            /**
             * Fires before loading routes into kendo.Router
             * By default it runs once
             * If config.router.remoteRoutes is defined, it will run once more
             *
             * @param {array} routes
             * @returns {array}
             */
            beforeLoadRoutes: function (routes) { return routes; },

            /**
             * Fires when a spa-handled url is clicked, but before kendo.Router starts navigating
             * Spa-handled behavior can be overridden:
             *  - return true when kendo.Router should continue the navigation
             *  - return false when browser should handle the navigation
             *
             * @param {jQuery.event} e
             * @param {string} url a.href
             * @returns {boolean}
             */
            navigateOnClick: function (e, url) { return true; },

            /**
             * Fires each time before a view is rendered
             * @param {object} route
             * @param {string} view
             * @param {kendo.Observable} viewModel
             */
            beforeLoadView: function (route, view, viewModel) { },

            /**
             * When viewModel is present: fires each time after viewModel's "load" events is finished
             * When no viewModel is present: fires each time after kendo.View is rendered
             *
             * @param {object} route
             * @param {string} view
             * @param {kendo.Observable} viewModel
             */
            afterLoadView: function (route, view, viewModel) { }
        };

        t.routes = [];

        t.baseUrl = config.pushState === true ? config.baseUrl + '/' : '';

        // Save originally loaded HTML Title. This will be changed dynamically according to current route
        t.originalTitle = config.baseTitle || $('title').html();

        // kendo Layout container
        t.loadLayout();

        // router settings
        t.kendoRouter = new kendo.Router({
            // configure HTML5 navite navigation
            pushState: config.pushState,

            // when route is changed
            change: function (e) {
                if ("onRouteChange" in t.events) {
                    t.events.onRouteChange.call(t, e);
                }
            },

            // navigating back
            back: function (e) {
                if ("onRouteBack" in t.events) {
                    t.events.onRouteBack.call(t, e);
                }
            },

            // serve 404
            routeMissing: function (e) {
                if ("onRouteMissing" in t.events) {
                    t.events.onRouteMissing.call(t, e);
                }
            }
        });
    };

    /**
     * Attach/Detach events
     * If eventHandler is null or undefined, it wil be treated as a detach operation
     * 
     * @param {string} name event name
     * @param {function} eventHandler handler function 
     */
    Router.prototype.event = function (name, eventHandler) {
        var t = this;

        if (!eventHandler === undefined || eventHandler === null) {
            delete t.events[name];
        } else {
            t.events[name] = eventHandler;
        }

        return t;
    };

    /**
     * Add routes dynamically (e.g. from json file or database)
     * 
     * Example route:
     * {
     *     "name": "home-index",
     *     "templateUrl": "/Home/Index",
     *     "viewModel": "home/index",
     * }
     *
     * @param {Array} data route-collection
     */
    Router.prototype.addRoutes = function (data) {
        var t = this;

        // route collection can be changed before loading them in
        if ("beforeLoadRoutes" in t.events) {
            data = t.events.beforeLoadRoutes.call(t, data);
        }

        Array.prototype.push.apply(t.routes, data);

        $.each(data, function (i, route) {
            // a route can have multiple names (aliases)
            if ($.isArray(route.name)) {
                $.each(route.name, function (j, name) {
                    t.addRoute(route, name);
                });
            } else {
                t.addRoute(route);
            }
        });
    };

    /**
     * Add a route definition
     *
     * Example route:
     * {
     *     "name": "home-index",
     *     "templateUrl": "/Home/Index",
     *     "viewModel": "home/index",
     * }
     *
     * @param {object} route specific route
     * @param {string} name override original route name
     */
    Router.prototype.addRoute = function (route, name) {
        var t = this;

        var routeName = name || route.name;
        routeName = (config.pushState === true && config.baseUrl.length > 0 ? config.baseUrl.substring(1) : '')
                    + routeName;

        t.kendoRouter.route(routeName, function () {
            // using "magic" arguments to collect all route parameters
            // passing the route data
            route.params = arguments;

            t.loadRoute(route);
        });
    };

    /**
     * Loads in a specific route
     *
     * @param route
     */
    Router.prototype.loadRoute = function (route) {
        var t = this;
        var engine = route.engine || config.layout.defaultEngine;

        require(["renderers/" + engine], function (renderer) {
            renderer.render(route).done(function (rendered) {
                t.loadView(rendered.viewModel, rendered.view, route);
            });
        });
    };

    /**
     * using kendoRouter.navigate to get the 404 page would cause confusion in back-navigation,
     * our loadRoute() method comes in handy for that
     */
    Router.prototype.handle404 = function () {
        var notFoundRoute = this.getRoute(config.router.notFoundRouteName);
        if (notFoundRoute) {
            this.loadRoute(notFoundRoute);
        } else {
            // fallback to default route
            var defaultRoute = this.getRoute('/');
            this.loadRoute(defaultRoute);
            console.log("Route '" + config.router.notFoundRouteName + "' was not found in route definition.");
        }
    };

    /**
     * Gets a route object by name
     * @param name
     * @returns {*}
     */
    Router.prototype.getRoute = function (name) {
        var route = this.routes.filter(function (item) {
            if ($.isArray(item.name)) {
                var subresult = item.name.filter(function (n) {
                    return n === name;
                });

                return subresult.length > 0;
            } else {
                return item.name === name;
            }
        });

        if (route.length > 0) {
            return route[route.length-1];
        }

        return null;
    };

    /**
     * Helper for router navigation
     *
     */
    Router.prototype.initNavigate = function () {
        var t = this;

        // these navigation links will be handled by kendo.Router
        $(document).ready(function () {
            $(document).on("click", config.router.routerHandledLinkClasses,
                function (e) {
                    if ($(this).attr('target') === '_self') {
                        return true;
                    }

                    var canContinue = true,
                        url = $(this).attr('href'),
                        baseUrl = (config.pushState === true ? config.baseUrl.substring(1) : '')

                    // override default behavior
                    if ("navigateOnClick" in t.events) {
                        canContinue = t.events.navigateOnClick.call(this, e, url);
                    }

                    // kendo.Router navigation continues
                    if (canContinue === true) {
                        if (url.length > 0 && url.substring(1, 1) !== '#') {
                            t.kendoRouter.navigate(baseUrl + url);

                            return false;
                        }
                    }

                    // otherwise it will be a browser-handled link
                    return true;
                });
        });
    };

    /**
     * internal viewModel handler
     *
     * @param viewModel
     * @param route
     * @returns {Promise}
     * @private
     */
    var _viewModelHandler = function (viewModel, route) {
        var t = this;

        viewModel.route = route;
        viewModel.router = t;
        var promise = $.Deferred();
        if ("load" in viewModel && viewModel.load) {
            var result = viewModel.load.call(viewModel, route);

            if (result) {
                result.done(function () {
                    promise.resolve();
                });
            } else {
                promise.resolve();
            }
        } else {
            promise.resolve();
        }

        return promise;
    };

    /**
     * Layout render
     */
    Router.prototype.loadLayout = function () {
        var t = this;

        // kendo Layout container
        require([config.layout.defaultEngine + "!" + config.layout.template, config.layout.templateViewModel],
            function (html, viewModel) {
                t.layout = new kendo.Layout(html, { model: viewModel, wrap: true, evalTemplate: false });
                t.layout.render($(config.layout.containerSelector));

                _viewModelHandler.call(t, viewModel, null)
                    .done(function () { });
            });
    };

    /**
     * View render
     * 
     * @param {kendo.Observable} viewModel assigned ViewModel
     * @param {kendo.Template} view Html template (kendo format)
     * @param {Object} route route data
     */
    Router.prototype.loadView = function (viewModel, view, route) {
        var t = this;

        // cleanup for previous viewmodel instance
        if (t.currentViewModel) {
            if (t.currentViewModel.unload) {
                t.currentViewModel.unload();
            }

            t.currentViewModel = null;
        }

        // global event
        if ("beforeLoadView" in t.events) {
            t.events.beforeLoadView.call(t, route, view, viewModel);
        }

        // render view
        var kendoView = new kendo.View(view, { model: viewModel, wrap: false, evalTemplate: false });
        t.layout.showIn(config.layout.contentSelector, kendoView);

        // global event
        var _afterLoadView = function () {
            if ("afterLoadView" in t.events) {
                t.events.afterLoadView.call(t, route, view, viewModel);
            }
        };

        if (viewModel) {
            t.currentViewModel = viewModel;
            _viewModelHandler.call(t, viewModel, route)
                .done(function () {
                    _afterLoadView();
                });
        } else {
            _afterLoadView();
        }

        // set HTML Title
        if (route) {
            $('title').html(route.title + t.originalTitle);
        }
    };

    /**
     * Load routes and startup kendo.Router
     */
    Router.prototype.start = function () {
        var t = this;

        // internal start function
        t._start = function () {
            // hide splash screen
            // @todo
            if (config.splash === true) {
                //TODO
            }

            // router-handled links
            t.initNavigate();

            // load available routes from remote server or json file
            if ("remoteRoutes" in config.router && $.type(config.router.remoteRoutes) === "string") {
                // loads available routes from json file
                $.getJSON(config.router.remoteRoutes)
                    .done(function (data) {
                        t.addRoutes(data);
                        t.kendoRouter.start();
                    })
                    .fail(function (e) {
                        console.log(e);
                        t.kendoRouter.start();
                    });
            } else {
                t.kendoRouter.start();
            }
        };

        // load routes
        if ("localRoutes" in config.router && $.type(config.router.localRoutes) === 'string') {
            // loads available routes from json file
            require(['json!' + config.router.localRoutes], function (data) {
                t.addRoutes(data);
                t._start();
            });
        } else {
            t._start();
        }
    };

    return Router;
});
