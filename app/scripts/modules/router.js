zframe.module('zRouter', (_elements) => {
  let routes = [];

  let addRoute = (path, spec) => {
    routes[path] = spec;
  };

  let defaultRoute = (spec) => {
    return addRoute('/', spec);
  };

  zframe.bindEvent(_elements.app, 'click', 'a', (e) => {
    e.preventDefault();
    console.log('It works!', e);
  });

  return {
    when: addRoute,
    otherwise: defaultRoute
  };
});
