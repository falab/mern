'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

window.Zframe = function () {
  var _info = {
    name: 'Zframe',
    version: '0.0.0'
  };
  var _data = {};
  var _cache = {};
  var _modules = {
    loaded: {},
    unloaded: {},
    scopes: {}
  };
  var _controllers = {};
  var _fn = {};
  var _elements = {};
  var _prototypes = {};

  _prototypes.controller = {
    name: null,
    fn: null,
    deps: [_elements],
    isValid: function isValid() {
      if (typeof this.name !== 'string') return false;
      if (typeof this.fn !== 'function') return false;
      if (!Array.isArray(this.deps)) return false;
      return true;
    },
    loadDeps: function loadDeps() {
      // intentionally starting at 1 to skip the elements hash
      for (var i = 1; i < this.deps.length; i++) {
        var modName = this.deps[i];
        var module = _modules.loaded[modName];

        if (module === undefined) {
          zframe.logger.warn('controller \'' + this.name + '\' dependency \'' + modName + '\' is not a loaded module.');
        }

        this.deps[i] = module;
      }
    },
    init: function init() {
      if (!this.isValid()) {
        return false;
      }

      this.loadDeps();
      this.methods = this.fn.apply(this, this.deps);

      zframe.logger.info('controller \'' + this.name + '\' initialized.');

      return true;
    }
  };

  var zframe = {};

  function cacheElements() {
    _elements.app = document.getElementById('app');
  }

  // Check if a module is registered for loading
  function moduleRegistered(modName) {
    return Object.key(_modules.unloaded).indexOf(modName) > -1;
  }

  // Check if a module has been loaded
  function moduleLoaded(modName) {
    return Object.keys(_modules.loaded).indexOf(modName) > -1;
  }

  // load a module
  function loadModule(modName) {
    var modData = _modules.unloaded[modName];

    if (typeof modData === 'function') {
      modData = {
        fn: modData,
        scope: {}
      };
    } else if (modData.hasOwnProperty('length')) {
      var modFn = modData.pop();

      modData = {
        fn: modFn,
        dependencies: modData,
        scope: {}
      };
    } else if ((typeof modData === 'undefined' ? 'undefined' : _typeof(modData)) !== "object") {
      zframe.logger.error('module \'' + modName + '\' could not be loaded.');
      return;
    }

    if (!modData.hasOwnProperty('scope')) {
      modData.scope = {};
    }

    var dependencies = [_elements];

    // TODO: handle 'call stack exceeded' if it shows up
    if (modData.dependencies !== undefined) {
      modData.dependencies.forEach(function (depName, i) {
        if (!moduleLoaded(depName)) {
          if (!moduleRegistered) {
            zframe.logger.error('module \'' + modName + '\' dependency \'' + depName + '\' is not a registered module.');
            return;
          }

          loadModule(depName);
          dependencies.push(_modules.loaded[depName]);
        }
      });
    }

    _modules.scopes[modName] = modData.scope;
    _modules.loaded[modName] = modData.fn.apply(modData.scope, dependencies);

    zframe.logger.info('module \'' + modName + '\' loaded!');

    delete _modules.unloaded[name];
  }

  // Load all unloaded modules
  function loadModules() {
    Object.keys(_modules.unloaded).forEach(function (modName) {
      if (!moduleLoaded(modName)) {
        loadModule(modName);
      }
    });
  }

  function initializeControllers() {
    Object.keys(_controllers).forEach(function (key) {
      _controllers[key].init();
    });
  }

  // Abstract logging for later
  // TODO: create custom logging
  zframe.logger = {
    log: function log() {
      console.log.apply(console, arguments);
    },
    info: function info(message) {
      console.info(_info.name + ': ' + message);
    },
    warn: function warn(message) {
      console.warn(_info.name + ': ' + message);
    },
    error: function error(message) {
      console.error(_info.name + ': ' + message);
    },
    table: function table() {
      console.table.apply(console, arguments);
    }
  };

  // TODO: write xhr utility
  zframe.xhr = function () {
    return function (options) {
      if (typeof options === "string") {
        options = {
          url: options
        };
      }

      zframe.logger.info('performing XHR to \'' + options.url + '\' here.');
    };
  };

  zframe.trigger = function (el, evtType, spec) {
    if (typeof el === 'string') {
      el = document.querySelector(el);
    }

    var e = new Event(evtType, {
      bubbles: false,
      cancelable: false
    });

    el.dispatchEvent(e);
  };

  // Binds an event to an element, support delegation
  zframe.bindEvent = function (el, evtType, spec, fn) {
    if (typeof el === 'string') {
      el = document.querySelector(el);
    }

    if (fn === undefined) {
      if (typeof spec === "function") {
        fn = spec;
      } else if ((typeof spec === 'undefined' ? 'undefined' : _typeof(spec)) === "object") {
        fn = spec.fn;
      }
    }

    var query = undefined;

    if (typeof spec === "string") {
      query = spec;
    } else if ((typeof spec === 'undefined' ? 'undefined' : _typeof(spec)) === "object") {
      query = spec.query;
    }

    if ((typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) === undefined) {
      app.logger.error('couldn\'t find an event to bind');
    }

    if (query === undefined) {
      el.addEventListener(evtType, fn);
    } else {
      el.addEventListener(evtType, function (e) {
        var matches = Array.prototype.slice.call(el.querySelectorAll(query));

        if (matches.indexOf(e.target) !== -1) {
          fn.apply(this, arguments);
        }
      });
    }
  };

  // Add the properties of one object to another, shallow copy
  zframe.extend = function (obj1, obj2) {
    if ((typeof obj2 === 'undefined' ? 'undefined' : _typeof(obj2)) !== 'object') {
      return;
    }

    Object.keys(obj2).forEach(function (key) {
      obj1[key] = obj2[key];
    });

    return obj1;
  };

  // When passed only a modName, returns module
  // when passed modName and modData, registers a module for loading
  zframe.module = function (modName, modData) {
    // If modData is passed, register and return unloaded module
    if (modData !== undefined) {
      if (Object.keys(_modules.unloaded).indexOf(modName) !== -1) {
        zframe.logger.warn('module \'' + modName + '\' already registered for loading.');
      } else {
        _modules.unloaded[modName] = modData;
      }

      return zframe;
    }

    // If modData is not passed return loaded module
    if (Object.keys(_modules.loaded).indexOf(modName) === -1) {
      return zframe.logger.error('module \'' + modName + '\' doesn\'t exist.');
    }

    return _modules.loaded[modName];
  };

  // Method for registering and returning controllers
  zframe.controller = function (contName, spec) {
    if (spec !== undefined) {
      if (Object.keys(_controllers).indexOf(contName) !== -1) {
        zframe.logger.warn('controller \'' + contName + '\' already loaded.');
        return zframe;
      }

      var controller = Object.create(_prototypes.controller);
      controller.name = contName;

      if (typeof spec === 'function') {
        controller.fn = spec;
      } else if (Array.isArray(spec)) {
        controller.fn = spec.pop();
        controller.deps = controller.deps.concat(spec);
      } else if ((typeof spec === 'undefined' ? 'undefined' : _typeof(spec)) === 'object') {
        zframe.extend(controller.prototype, spec);
      }

      _controllers[contName] = controller;

      return zframe;
    }

    if (Object.keys(_controllers).indexOf(contName) === -1) {
      return zframe.logger.error('controller \'' + contName + '\' doesn\'t exist.');
    }

    return _controllers[contName];
  };

  // Initializes all of the modules
  zframe.init = function () {
    cacheElements();
    loadModules();
    initializeControllers();

    zframe.logger.info('initialization complete.');
  };

  return zframe;
};

window.zframe = Zframe();
'use strict';

zframe.module('main', function (_elements) {
  var data = {
    menuItems: [{ path: '/', text: 'home' }, { path: '/portfolio', text: 'portfolio' }, { path: 'http://www.google.com', text: 'Google', remote: true }]
  };

  _elements.app.innerHTML = zframe.Templates.application(data);
});
'use strict';

/**
 * Verbiage note: "routeSpec" is the route definition BEFORE adding to routes, still allowed to be changed
 * "route" is the route definition as returned from the routes hash, not allowed to be modified at this point
 */
zframe.module('zRouter', function (_elements) {
  // Hash of all app routes
  var routes = {
    'home': {
      path: '/',
      controller: 'homeController',
      action: 'show',
      template: 'home'
    },
    'portfolio': {
      path: '/portfolio',
      controller: 'portfolioController',
      action: 'index',
      template: 'portfolio'
    }
  };

  // Pushes a routeSpec into the routes hash with specified name
  function addRoute(name, routeSpec) {
    // Early return if path isn't a string
    if (typeof routeSpec.path !== 'string') {
      zframe.logger.warn('Route \'' + name + '\' couldn\'t be added, path couldn\'t be processed.');
      return;
    }

    // prepend a slash to path if it doesn't already start with one
    if (routeSpec.path[0] !== '/') {
      routeSpec.path = '/' + routeSpec.path;
    }

    // add routeSpec to routes hash
    routes[name] = routeSpec;
  }

  // Pushes a routeSpec object into the routes hash with a path of /
  function defaultRoute(routeSpec) {
    return addRoute('default', zframe.extend(routeSpec, { path: '/' }));
  }

  // Returns the first route that matches a path
  function getRouteByPath(path) {
    var route = undefined;

    // Loop through routes and break on first match (screw your 'for' loop.)
    Object.keys(routes).every(function (routeName) {
      if (routes[routeName].path === path) {
        route = routes[routeName];
        return false;
      }

      return true;
    });

    return route;
  }

  // TODO: Processes a route object and routes the user accordingly
  function processRoute(route) {
    zframe.logger.log('Process route \'' + route.path + '\'', route);
  }

  // Bind to all link clicks
  zframe.bindEvent(_elements.app, 'click', 'a', function (e) {
    if (!e.target.hasAttribute('href')) {
      return;
    }

    var targetRoute = getRouteByPath(e.target.getAttribute('href'));

    if (targetRoute) {
      e.preventDefault();
      history.pushState({ route: targetRoute }, '', targetRoute.path);
      processRoute(targetRoute);
    }
  });

  // Bind the popstate event and process routes
  zframe.bindEvent(window, 'popstate', function (e) {
    processRoute(e.state.route);
  });

  // Return the public methods
  return {
    when: addRoute,
    otherwise: defaultRoute
  };
});
'use strict';

zframe.controller('HomeController', ['zRouter', function (_elements, zRouter) {
  return {
    index: function index() {
      zframe.logger.info('HomeController index method ran');
      zframe.logger.log(_elements, zRouter);
    }
  };
}]);