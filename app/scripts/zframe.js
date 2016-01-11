window.Zframe = function () {
  let _data = {},
    _modules = {
      loaded: {},
      unloaded: {},
      scopes: {}
    },
    _fn = {},
    utils = {},
    ret = {};

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
      utils.logger.error(`Module '${modName}' could not be loaded.`);
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
            utils.logger.error(`Dependency '${depName}' not a registered module.`);
            return;
          }

          loadModule(depName);
          dependencies.push(_modules.loaded[depName]);
        }
      });
    }

    _modules.scopes[modName] = modData.scope;
    _modules.loaded[modName] = modData.fn.apply(modData.scope, dependencies);

    utils.logger.info(`Module '${modName}' loaded!`);

    delete _modules.unloaded[name];
  }

  // Load all unloaded modules
  function loadModules() {
    Object.keys(_modules.unloaded).forEach((modName) => {
      if (!moduleLoaded(modName)) {
        loadModule(modName);
      }
    });
  }

  // Abstract logging for later
  // TODO: create custom logging
  utils.logger = {
    log: function () {
      console.log.apply(console, arguments);
    },
    info: function () {
      console.info.apply(console, arguments);
    },
    warn: function () {
      console.warn.apply(console, arguments);
    },
    error: function () {
      console.error.apply(console, arguments);
    },
    table: function () {
      console.table.apply(console, arguments);
    },
  };

  // Add the properties of one object to another, shallow copy
  utils.extend = (obj1, obj2) => {
    if (typeof obj2 !== 'object') {
      return;
    }

    Object.keys(obj2).forEach((key) => {
      obj1[key] = obj2[key];
    });

    return obj1;
  };

  // When passed only a modName, returns module
  // when passed modName and modData, registers a module for loading
  ret.module = (modName, modData) => {
    // If modData is passed, register and return unloaded module
    if (modData !== undefined) {
      if (Object.keys(_modules.unloaded).indexOf(modName) !== -1) {
        utils.logger.warn(`Module '${modName}' already registered for loading.`);
      } else {
        _modules.unloaded[modName] = modData;
      }

      return _modules.unloaded[modName];
    }

    // If modData is not passed return loaded module
    if (Object.keys(_modules.loaded).indexOf(modName) === -1) {
      utils.logger.error(`Module '${modName}' doesn't exist`);
      return;
    }

    return _modules.loaded[modName];
  };

  // Initializes all of the modules
  ret.init = () => {
    loadModules();
    utils.logger.info('zframe initialized');
  };

  utils.logger.info('zframe loaded');

  // Combine utility functions into the return object for use in modules
  return utils.extend(ret, utils);
};

window.zframe = Zframe();
