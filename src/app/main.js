/**
 * Application main entry point
 * @author Márton Sági
 * @version 0.1
 */

// RequireJS configuration
require.config({
    baseUrl: "./app",
    paths: {},
    shim: {},
    // longer than default 7 seconds
    waitSeconds: 20
});

// initialize application
require(['app'], function (app) {
    app.start();
});