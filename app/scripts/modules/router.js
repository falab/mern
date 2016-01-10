app.module('router', () => {
  let routes = [];

  let addRoute = (path, spec) => {
    routes[path] = spec;
  };

  let defaultRoute = (spec) => {
    return addRoute('/', spec);
  };

  return {
    when: addRoute,
    otherwise: defaultRoute
  };
});
