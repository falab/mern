window.App = function () {
  let _data = {};
  let _modules = {
    loaded: {},
    unloaded: {},
    scopes: {}
  };

  // Abstract logging for later
  // TODO: create custom logging
  let logger = (function () {
    return {
      log: function () { console.log.apply(console, arguments); },
      info: function () { console.info.apply(console, arguments); },
      warn: function () { console.warn.apply(console, arguments); },
      error: function () { console.error.apply(console, arguments); },
      table: function () { console.table.apply(console, arguments); },
    };
  }());

  // When passed only a modName, returns module
  // when passed modName and modData, registers a module for loading
  let registerModule = (modName, modData) => {
    // If modData is passed, register and return unloaded module
    if (modData !== undefined) {
      if (Object.keys(_modules.unloaded).indexOf(modName) !== -1) {
        logger.warn(`Module '${modName}' already registered for loading.`);
      } else {
        _modules.unloaded[modName] = modData;
      }

      return _modules.unloaded[modName];
    }

    // If modData is not passed return loaded module
    if (Object.keys(_modules.loaded).indexOf(modName) === -1) {
      logger.error(`Module '${modName}' doesn't exist`);
      return;
    }

    return _modules.loaded[modName];
  };

  let moduleLoaded = function (modName) {
    return Object.keys(_modules.loaded).indexOf(modName) > -1;
  };

  let moduleRegistered = function (modName) {
    return Object.key(_modules.unloaded).indexOf(modName) > -1;
  };

  let loadModule = function (modName) {
    let modData = _modules.unloaded[modName];

    if (typeof modData === 'function') {
      modData = {
        fn: modData,
        scope: {}
      };
    } else if (modData.hasOwnProperty('length')) {
      let modFn = modData.pop();

      modData = {
        fn: modFn,
        dependencies: modData,
        scope: {}
      };
    } else if (typeof modData !== "object") {
      logger.error(`Module '${modName}' could not be loaded.`);
      return;
    }

    if (!modData.hasOwnProperty('scope')) {
      modData.scope = {};
    }

    let dependencies = [];

    // TODO: handle 'call stack exceeded'
    if (modData.dependencies !== undefined) {
      modData.dependencies.forEach((depName, i) => {
        if (!moduleLoaded(depName)) {
          if (!moduleRegistered) {
            logger.error(`Dependency '${depName}' not a registered module.`);
            return;
          }

          loadModule(depName);
          dependencies.push(_modules.loaded[depName]);
        }
      });
    }

    _modules.scopes[modName] = modData.scope;
    _modules.loaded[modName] = modData.fn.apply(modData.scope, dependencies);
    logger.info(`Module '${modName}' loaded!`);

    delete _modules.unloaded[name];
  };

  let loadModules = function () {
    Object.keys(_modules.unloaded).forEach((modName) => {
      if (!moduleLoaded(modName)) {
        loadModule(modName);
      }
    });
  };

  return {
    logger: logger,
    module: registerModule,
    init: () => {
      loadModules();
    }
  };
};

window.app = App();
