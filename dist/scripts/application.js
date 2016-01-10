'use strict';

window.App = function () {
  var data = {};
  var modules = {};

  // Abstract logging for later
  // TODO: create custom logging
  var logger = function () {
    return {
      log: console.log,
      warn: console.warn,
      error: console.error,
      table: console.table
    };
  }();

  // module interface for setting and getting modules
  // returns named module
  var module = function module(name, data) {
    if (data !== undefined) {
      if (modules[name] !== undefined) {
        logger.warn('Module \'' + name + '\' already registered');
      } else {
        var modFn = null;

        if (typeof data === 'function') {
          modFn = data;
          data = [];
        } else if (data.length !== undefined) {
          modFn = data.pop();
        }

        if (data.length) {
          data.forEach(function (i, modName) {
            data[i] = modules[modName];
          });
        }

        modules[name] = modFn.apply(data);
      }
    }

    if (modules[name] === undefined) {
      logger.error('Module \'' + name + '\' doesn\'t exist');
      return;
    }

    return modules[name];
  };

  return {
    logger: logger,
    module: module
  };
};

window.app = App();
'use strict';

app.module('TestModule', function () {
  return 'test passed';
});
'use strict';

app.module('init', ['TestModule', function (TestModule) {
  return function () {
    window.alert('test');
  };
}]);