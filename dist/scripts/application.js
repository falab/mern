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
  var _fn = {};
  var _elements = {};

  var utils = {};
  var ret = {};

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
      utils.logger.error(_info.name + ' module \'' + modName + '\' could not be loaded.');
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
            utils.logger.error(_info.name + ' module \'' + modName + '\' dependency \'' + depName + '\' is not a registered module.');
            return;
          }

          loadModule(depName);
          dependencies.push(_modules.loaded[depName]);
        }
      });
    }

    _modules.scopes[modName] = modData.scope;
    _modules.loaded[modName] = modData.fn.apply(modData.scope, dependencies);

    utils.logger.info(_info.name + ' module \'' + modName + '\' loaded!');

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

  // Abstract logging for later
  // TODO: create custom logging
  utils.logger = {
    log: function log() {
      console.log.apply(console, arguments);
    },
    info: function info() {
      console.info.apply(console, arguments);
    },
    warn: function warn() {
      console.warn.apply(console, arguments);
    },
    error: function error() {
      console.error.apply(console, arguments);
    },
    table: function table() {
      console.table.apply(console, arguments);
    }
  };

  // TODO: write xhr utility
  utils.xhr = function () {
    return function (options) {
      if (typeof options === "string") {
        options = {
          url: options
        };
      }

      zframe.logger.info('Performing XHR to ' + options.url + ' here');
    };
  };

  utils.trigger = function (el, evtType, spec) {
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
  utils.bindEvent = function (el, evtType, spec, fn) {
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

    var q = undefined;

    if (typeof spec === "string") {
      q = spec;
    } else if ((typeof spec === 'undefined' ? 'undefined' : _typeof(spec)) === "object") {
      q = spec.query;
    }

    if ((typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) === undefined) {
      app.logger.error(_info.name + ' couldn\'t find an event to bind');
    }

    if (q === undefined) {
      el.addEventListener(evtType, fn);
    } else {
      el.addEventListener(evtType, function (e) {
        var qMatches = Array.prototype.slice.call(el.querySelectorAll(q));
        if (qMatches.indexOf(e.target) !== -1) {
          fn.apply(this, arguments);
        }
      });
    }
  };

  // Add the properties of one object to another, shallow copy
  utils.extend = function (obj1, obj2) {
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
  ret.module = function (modName, modData) {
    // If modData is passed, register and return unloaded module
    if (modData !== undefined) {
      if (Object.keys(_modules.unloaded).indexOf(modName) !== -1) {
        utils.logger.warn(_info.name + ' module \'' + modName + '\' already registered for loading.');
      } else {
        _modules.unloaded[modName] = modData;
      }

      return _modules.unloaded[modName];
    }

    // If modData is not passed return loaded module
    if (Object.keys(_modules.loaded).indexOf(modName) === -1) {
      utils.logger.error(_info.name + ' module \'' + modName + '\' doesn\'t exist.');
      return;
    }

    return _modules.loaded[modName];
  };

  // Initializes all of the modules
  ret.init = function () {
    cacheElements();
    loadModules();

    utils.logger.info(_info.name + ' initialization complete.');
  };

  utils.logger.info(_info.name + ' v' + _info.version + ' loaded!');

  // Combine utility functions into the return object for use in modules
  return utils.extend(ret, utils);
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