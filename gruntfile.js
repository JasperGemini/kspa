/** gruntfile **/

module.exports = function (grunt) {

    // basepaths
    // paths are available within grunt config object too! E.g.: <%= assetPath %>
    var bowerPath = './bower_components';
    var distPath = './dist';
    var assetPath = './src';
    var appBuildPath = './build';

    var bowerConfig = {
        install: {
            options: {
                targetDir: assetPath + "/lib",
                    verbose: true,
                    layout: function(type, component, source) {
                    return type;
                }
            }
        }
    };

    // clean generated js and css files
    var cleanConfig = {
        build: {
            src: [
                distPath + '/app/*',
                distPath + '/css/*',
            ]
        }
    };

    // combine js files
    var concatConfig = {
        options: {
            separator: ';\n'
        },
        build: {
            src: [
                bowerPath + '/jquery/dist/jquery.js',
                bowerPath + '/bootstrap/dist/js/bootstrap.js',

                bowerPath + '/kendo-ui/js/kendo.core.min.js',
                bowerPath + '/kendo-ui/js/kendo.data.min.js',
                bowerPath + '/kendo-ui/js/kendo.router.min.js',
                bowerPath + '/kendo-ui/js/kendo.binder.min.js',
                bowerPath + '/kendo-ui/js/kendo.fx.min.js',
                bowerPath + '/kendo-ui/js/kendo.view.min.js'
            ],
            dest: assetPath + '/app/libs.js'
        }
    };

    // copy files
    var copyConfig = {
        build: {
            files: [
                {
                    expand: true,
                    cwd: bowerPath + '/requirejs/',
                    src: ['require.js'],
                    dest: assetPath + '/app'
                },
                {
                    expand: true,
                    cwd: bowerPath + '/requirejs-text/',
                    src: ['text.js'],
                    dest: assetPath + '/app'
                },
                {
                    expand: true,
                    cwd: bowerPath + '/requirejs-json/',
                    src: ['json.js'],
                    dest: assetPath + '/app'
                }
            ]
        },
        dist: {
            files: [
                {
                    expand: true,
                    cwd: bowerPath + '/bootstrap/dist/fonts/',
                    src: ['**/*.*'],
                    dest: distPath + '/fonts'
                },
                {
                    expand: true,
                    cwd: assetPath + '/img/',
                    src: ['**/*.*'],
                    dest: distPath + '/img'
                },

                {
                    expand: true,
                    cwd: assetPath,
                    src: ['index.html'],
                    dest: distPath + '/'
                },
                {
                    expand: true,
                    cwd: assetPath + '/css/',
                    src: ['*.min.css'],
                    dest: distPath + '/css'
                }
            ]
        }
    };

    // less compilation
    var lessConfig = {
        build: {
            options: {
                compress: false,
                yuicompress: false,
                optimization: 2,
            },
            files: {
                '<%= assetPath %>/css/site.css': '<%= assetPath %>/less/site.less'
            }
        }
    };

    // minify css files
    var cssminConfig = {
        options: {
            shorthandCompacting: false,
            roundingPrecision: -1
        },
        build: {
            files: {
                '<%= assetPath %>/css/site.min.css': [
                    bowerPath + '/bootstrap/dist/css/bootstrap.css',
                    bowerPath + '/bootstrap/dist/css/bootstrap-theme.css',
                    '<%= assetPath %>/css/site.css'
                ]
            }
        }
    };

    /**
     * https://github.com/cloudchen/requirejs-bundle-examples
     * http://clintconklin.com/optimizing-multiple-javascript-files-with-grunt-and-requirejs/
     * http://gruntjs.com/api/grunt.file
     */
    var getRequireJsIncludes = function (path, prefix, ext) {
        var files = [],
            basePath = assetPath + '/app/',
            prepend = prefix || '',
            extension = ext || '',
            elems = grunt.file.expand(basePath + path);

        elems.forEach(function (elem) {
            var filename = elem.replace(basePath, '');
            files.push(prepend + filename.replace(extension, ''));
        });

        return files;
    };

    var getAllRequireJsIncludes = function () {
        var result = ['app'];

        Array.prototype.push.apply(result, getRequireJsIncludes('viewmodels/*', null, '.js'));
        Array.prototype.push.apply(result, getRequireJsIncludes('renderers/*', null, '.js'));
        Array.prototype.push.apply(result, getRequireJsIncludes('views/*', 'text!'));
        Array.prototype.push.apply(result, getRequireJsIncludes('data/*', 'json!'));

        return result;
    };

    // requirejs optimization
    var requirejsConfig = {
        options: {
            'appDir': assetPath,
            'dir': appBuildPath,
            'mainConfigFile': assetPath + '/app/main.js',
            "optimizeAllPluginResources": true,
            //'optimize': 'uglify2',
            'normalizeDirDefines': 'all',
            'skipDirOptimize': true,
        },
        centralized: {
            options: {
                'modules': [{
                    'name': 'main',
                    'include': getAllRequireJsIncludes()
                }]
            }
        }
    };

    // minify js files
    var uglifyConfig = {
        build: {
            files: [
                {
                    '<%= distPath %>/app/main.js':      [ '<%= appBuildPath %>/app/main.js' ],
                    '<%= distPath %>/app/require.js':   [ '<%= appBuildPath %>/app/require.js' ],
                    '<%= distPath %>/app/libs.js':      [ '<%= appBuildPath %>/app/libs.js' ]
                }
            ]
        }
    };

    var execConfig = {
        restore: 'npm install && bower install'
    };

    var connectConfig = {
        debug: {
            options: {
                port: 9001,
                base: 'src',
                keepalive: true
            }
        },
        live: {
            options: {
                port: 9000,
                base: 'dist',
                keepalive: true
            }
        }
    };

    // configure Grunt
    grunt.initConfig({
        bowerPath: bowerPath,
        distPath: distPath,
        assetPath: assetPath,
        appBuildPath: appBuildPath,
        bower: bowerConfig,
        concat: concatConfig,
        connect: connectConfig,
        copy: copyConfig,
        cssmin: cssminConfig,
        clean: cleanConfig,
        exec: execConfig,
        less: lessConfig,
        requirejs: requirejsConfig,
        uglify: uglifyConfig
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Register Tasks

    // deploy to dist folder
    grunt.registerTask('dist',
        [
            //'exec',
            'clean:build',
            'copy:build',
            'concat',
            'requirejs:centralized',
            'uglify:build',
            'less:build',
            'cssmin:build',
            'copy:dist'
        ]
    );

    // static dev server
    grunt.registerTask('serve-debug', ['connect:debug']);
    grunt.registerTask('serve-live', ['connect:live']);
};
