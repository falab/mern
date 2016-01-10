'use strict';

window.App = function () {
  var _this = this;

  var data = {};
  var modules = {};

  // Abstract logging for later
  // TODO: create custom logging
  var logger = function () {
    return {
      log: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error,
      table: console.table
    };
  }();

  // module interface for setting and getting modules with dependency injection
  // returns named module
  var module = function module(name, data) {
    if (data !== undefined) {
      if (modules[name] !== undefined) {
        logger.warn('Module \'' + name + '\' already registered');
      } else {
        var modFn = null;

        debugger;

        if (typeof data === 'function') {
          modFn = data;
          data = [];
        } else if (data.length !== undefined) {
          modFn = data.pop();
        }

        if (data.length) {
          for (var i = 0; i < data.length; i++) {
            var modName = data[i];
            data[i] = modules[modName];
          }
        }

        modules[name] = modFn.apply(_this, data);
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

app.module('init', ['xhr', function (xhr) {
  return function () {
    xhr('http://www.google.com');
  };
}]);
"use strict";

app.module('xhr', function () {
  var xhr = function xhr(options) {
    if (typeof options === "string") {
      options = {
        url: options
      };
    }

    app.logger.info("Performing XHR to " + options.url + " here");
  };

  return xhr;
});