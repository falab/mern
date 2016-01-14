/**
 * Verbiage note: "routeSpec" is the route definition BEFORE adding to routes, still allowed to be changed
 * "route" is the route definition as returned from the routes hash, not allowed to be modified at this point
 */
zframe.module('zRouter', function (_elements) {
  // Hash of all app routes
  let routes = {
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
      zframe.logger.warn(`Route '${name}' couldn't be added, path couldn't be processed.`);
      return;
    }

    // prepend a slash to path if it doesn't already start with one
    if (routeSpec.path[0] !== '/') {
      routeSpec.path = `/${routeSpec.path}`;
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
    let route;

    // Loop through routes and break on first match (screw your 'for' loop.)
    Object.keys(routes).every((routeName) => {
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
    zframe.logger.log(`Process route '${route.path}'`, route);
  }

  // Bind to all link clicks
  zframe.bindEvent(_elements.app, 'click', 'a', function (e) {
      if (!e.target.hasAttribute('href')) {
        return;
      }

      let targetRoute = getRouteByPath(e.target.getAttribute('href'));

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
