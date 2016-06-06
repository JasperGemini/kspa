/**
 * Application main entry point
 * @author Márton Sági
 * @version 1.0
 */

// RequireJS configuration
require.config({
    baseUrl: "./app",

    paths: {},
    shim: {},
    // longer than default 7 seconds
    waitSeconds: 30
});

// initialize application
require(['app'], function (app) {
    app.start();
});