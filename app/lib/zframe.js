window.Zframe = function () {
  let _info = {
    name: 'Zframe',
    version: '0.0.0'
  };
  let _data = {};
  let _cache = {};
  let _modules = {
    loaded: {},
    unloaded: {},
    scopes: {}
  };
  let _controllers = {};
  let _fn = {};
  let _elements = {};
  let _prototypes = {};

  _prototypes.controller = {
    name: null,
    fn: null,
    deps: [_elements],
    isValid: function () {
      if (typeof this.name !== 'string') return false;
      if (typeof this.fn !== 'function') return false;
      if (!Array.isArray(this.deps)) return false;
      return true;
    },
    loadDeps: function () {
      // intentionally starting at 1 to skip the elements hash
      for (let i = 1; i < this.deps.length; i++) {
        let modName = this.deps[i];
        let module = _modules.loaded[modName];

        if (module === undefined) {
          zframe.logger.warn(`controller '${this.name}' dependency '${modName}' is not a loaded module.`);
        }

        this.deps[i] = module;
      }
    },
    init: function () {
      if (!this.isValid()) {
        return false;
      }

      this.loadDeps();
      this.methods = this.fn.apply(this, this.deps);

      zframe.logger.info(`controller '${this.name}' initialized.`);

      return true;
    }
  };

  let zframe = {};

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
      zframe.logger.error(`module '${modName}' could not be loaded.`);
      return;
    }

    if (!modData.hasOwnProperty('scope')) {
      modData.scope = {};
    }

    let dependencies = [_elements];

    // TODO: handle 'call stack exceeded' if it shows up
    if (modData.dependencies !== undefined) {
      modData.dependencies.forEach((depName, i) => {
        if (!moduleLoaded(depName)) {
          if (!moduleRegistered) {
            zframe.logger.error(`module '${modName}' dependency '${depName}' is not a registered module.`);
            return;
          }

          loadModule(depName);
          dependencies.push(_modules.loaded[depName]);
        }
      });
    }

    _modules.scopes[modName] = modData.scope;
    _modules.loaded[modName] = modData.fn.apply(modData.scope, dependencies);

    zframe.logger.info(`${_info.name} module '${modName}' loaded!`);

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

  function initializeControllers() {
    Object.keys(_controllers).forEach((key) => {
      _controllers[key].init();
    });
  }

  // Abstract logging for later
  // TODO: create custom logging
  zframe.logger = {
    log: function () {
      console.log.apply(console, arguments);
    },
    info: function (message) {
      console.info(`${_info.name}: ${message}`);
    },
    warn: function (message) {
      console.warn(`${_info.name}: ${message}`);
    },
    error: function (message) {
      console.error(`${_info.name}: ${message}`);
    },
    table: function () {
      console.table.apply(console, arguments);
    },
  };

  // TODO: write xhr utility
  zframe.xhr = () => {
    return (options) => {
      if (typeof options === "string") {
        options = {
          url: options
        };
      }

      zframe.logger.info(`performing XHR to '${options.url}' here.`);
    };
  };

  zframe.trigger = (el, evtType, spec) => {
    if (typeof el === 'string') {
      el = document.querySelector(el);
    }

    let e = new Event(evtType, {
      bubbles: false,
      cancelable: false
    });

    el.dispatchEvent(e);
  };

  // Binds an event to an element, support delegation
  zframe.bindEvent = (el, evtType, spec, fn) => {
    if (typeof el === 'string') {
      el = document.querySelector(el);
    }

    if (fn === undefined) {
      if (typeof spec === "function") {
        fn = spec;
      } else if (typeof spec === "object") {
        fn = spec.fn;
      }
    }

    let query;

    if (typeof spec === "string") {
      query = spec;
    } else if (typeof spec === "object") {
      query = spec.query;
    }

    if (typeof fn === undefined) {
      app.logger.error('couldn\'t find an event to bind');
    }

    if (query === undefined) {
      el.addEventListener(evtType, fn);
    } else {
      el.addEventListener(evtType, function (e) {
        let matches = Array.prototype.slice.call(el.querySelectorAll(query));

        if (matches.indexOf(e.target) !== -1) {
          fn.apply(this, arguments);
        }
      });
    }
  };

  // Add the properties of one object to another, shallow copy
  zframe.extend = (obj1, obj2) => {
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
  zframe.module = function (modName, modData) {
    // If modData is passed, register and return unloaded module
    if (modData !== undefined) {
      if (Object.keys(_modules.unloaded).indexOf(modName) !== -1) {
        zframe.logger.warn(`module '${modName}' already registered for loading.`);
      } else {
        _modules.unloaded[modName] = modData;
      }

      return zframe;
    }

    // If modData is not passed return loaded module
    if (Object.keys(_modules.loaded).indexOf(modName) === -1) {
      return zframe.logger.error(`module '${modName}' doesn't exist.`);
    }

    return _modules.loaded[modName];
  };

  // Method for registering and returning controllers
  zframe.controller = function (contName, spec) {
    if (spec !== undefined) {
      if (Object.keys(_controllers).indexOf(contName) !== -1) {
        zframe.logger.warn(`controller '${contName}' already loaded.`);
        return zframe;
      }

      let controller = Object.create(_prototypes.controller);
      controller.name = contName;

      if (typeof spec === 'function') {
        controller.fn = spec;
      } else if (Array.isArray(spec)) {
        controller.fn = spec.pop();
        controller.deps = controller.deps.concat(spec);
      } else if (typeof spec === 'object') {
        zframe.extend(controller.prototype, spec);
      }

      _controllers[contName] = controller;

      return zframe;
    }

    if (Object.keys(_controllers).indexOf(contName) === -1) {
      return zframe.logger.error(`controller '${contName}' doesn't exist.`);
    }

    return _controllers[contName];
  };

  // Initializes all of the modules
  zframe.init = () => {
    cacheElements();
    loadModules();
    initializeControllers();

    zframe.logger.info('initialization complete.');
  };

  return zframe;
};

window.zframe = Zframe();
