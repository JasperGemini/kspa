# Advanced Kendo Router (SPA) Example


## Getting Started
Hardcoded routing and view definitions in the app.js? There must be a better way. 
Main purpose of this example is to show how dynamic route definitions can be handled with Kendo UI's Router module. 
Well, it's almost dynamic. To properly handle missing routes, one initial route have been hardcoded: the 404 route.
Eliminating that last tie is certainly possible, but this is something for the future.

### Backend-agnostic
Routes can be placed into a json file, or requested from [your favorite] backend.
Same goes with view files, where view paths are part of the route definition.

#### routes.json 
```js
[
  {
    "name": "/",
    "templateUrl": "views/index.html",
    "title": "Home",
    "viewModel": "index"
  },
  {
    "name": "about",
    "templateUrl": "views/about.html",
    "title": "About"
    "viewModel": "about",
  },
  {
    "name": "contact",
    "templateUrl": "views/contact.html",
    "title": "Contact"
    "viewModel": "contact",
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

## Usage
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