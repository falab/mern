'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

window.App = function () {
  var _data = {};
  var _modules = {
    loaded: {},
    unloaded: {},
    scopes: {}
  };

  // Abstract logging for later
  // TODO: create custom logging
  var logger = {
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

  // When passed only a modName, returns module
  // when passed modName and modData, registers a module for loading
  var registerModule = function registerModule(modName, modData) {
    // If modData is passed, register and return unloaded module
    if (modData !== undefined) {
      if (Object.keys(_modules.unloaded).indexOf(modName) !== -1) {
        logger.warn('Module \'' + modName + '\' already registered for loading.');
      } else {
        _modules.unloaded[modName] = modData;
      }

      return _modules.unloaded[modName];
    }

    // If modData is not passed return loaded module
    if (Object.keys(_modules.loaded).indexOf(modName) === -1) {
      logger.error('Module \'' + modName + '\' doesn\'t exist');
      return;
    }

    return _modules.loaded[modName];
  };

  var moduleLoaded = function moduleLoaded(modName) {
    return Object.keys(_modules.loaded).indexOf(modName) > -1;
  };

  var moduleRegistered = function moduleRegistered(modName) {
    return Object.key(_modules.unloaded).indexOf(modName) > -1;
  };

  var loadModule = function loadModule(modName) {
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
      logger.error('Module \'' + modName + '\' could not be loaded.');
      return;
    }

    if (!modData.hasOwnProperty('scope')) {
      modData.scope = {};
    }

    var dependencies = [];

    // TODO: handle 'call stack exceeded'
    if (modData.dependencies !== undefined) {
      modData.dependencies.forEach(function (depName, i) {
        if (!moduleLoaded(depName)) {
          if (!moduleRegistered) {
            logger.error('Dependency \'' + depName + '\' not a registered module.');
            return;
          }

          loadModule(depName);
          dependencies.push(_modules.loaded[depName]);
        }
      });
    }

    _modules.scopes[modName] = modData.scope;
    _modules.loaded[modName] = modData.fn.apply(modData.scope, dependencies);
    logger.info('Module \'' + modName + '\' loaded!');

    delete _modules.unloaded[name];
  };

  var loadModules = function loadModules() {
    Object.keys(_modules.unloaded).forEach(function (modName) {
      if (!moduleLoaded(modName)) {
        loadModule(modName);
      }
    });
  };

  return {
    logger: logger,
    module: registerModule,
    init: function init() {
      loadModules();
    }
  };
};

window.app = App();
'use strict';

app.module('main', ['xhr', function (xhr) {
  app.logger.info('main loaded!!!');
  xhr('http://www.google.com');
}]);
"use strict";

app.module('xhr', function () {
  return function (options) {
    if (typeof options === "string") {
      options = {
        url: options
      };
    }

    app.logger.info("Performing XHR to " + options.url + " here");
  };
});