# Advanced Kendo Router SPA Example
> Dynamic Routing

## Getting Started
Hardcoded routing and view definitions in the app.js? There must be a better way. 
Main purpose of this example is to show how dynamic route definitions can be handled with Kendo UI's Router module. 
Well, it's almost dynamic. In order to properly handle missing routes, 404 route's name have to be hardcoded 
into config.js. Eliminating that last tie is certainly possible, but this is something for the future.

### Backend-agnostic
Routes can be placed into a json file, or requested from [your favorite] backend.
Same goes with view files, where view paths are part of the route definition.

#### routes.json 
```js
[
  {
    "name": ["", "/", "home"],
    "title": "Home",
    "templateUrl": "views/index.html",
    "viewModel": "index"
  },
  {
    "name": "404",
    "title": "Not Found",
    "templateUrl": "views/notfound.html",
    "viewModel": "notfound"
  },
  {
    "name": ["about", "about-us"],
    "templateUrl": "views/about.html",
    "viewModel": "about",
    "title": "About"
  },
  {
    "name": "contact",
    "templateUrl": "views/contact.html",
    "viewModel": "contact",
    "title": "Contact"
  }
]
```

## Dependencies
As minimalistic as it can be...

* RequireJS
    * Text
    * Json
* 6 modules of Kendo UI Core
    * Core
    * Binder
    * Data
    * Fx
    * Router
    * View
* jQuery
* Bootstrap (optional)

...and that's it!

## Configurations

### RequireJS configuration (main.js)

```js
require.config({
    baseUrl: "./app",
    paths: {},
    shim: {},
    // longer than default 7 seconds
    waitSeconds: 30
});
```

### App configuration (config.js)

```js
var config = {
    baseUrl: '',
    baseTitle: null,
    culture: 'en',
    pushState: false,
    splash: false,
    router: {
        notFoundRouteName: "404",
        localRoutes: "data/routes.json",
        remoteRoutes: null,
        routerHandledLinkClasses: '#navbar a, a.spa'
    },
    layout: {
        template: 'views/layout.html',
        templateViewModel: 'viewmodels/layout',
        contentSelector: '#content',
        containerSelector: '#main-container',
        loaderSelector: '.router-loader',
        defaultEngine: 'text'
    },
    viewModel: {
        basePath: 'viewmodels/',
        format: "text!",
        destroyOnChange: false
    }
}
```


## Demo Usage
Initialization
```shell
npm install && bower install
```

Build with Grunt
```shell
grunt dist
```

Run the app with full source.. http://localhost:9001/
```shell
grunt serve-debug
```

..or run the optimized version: http://localhost:9000/
```shell
grunt serve-live
```

## Credits
Originated from Burke Holland's repository: https://github.com/burkeholland/kendo-ui-spa