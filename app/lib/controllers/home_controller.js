zframe.controller('HomeController', ['zRouter', function (_elements, zRouter) {
  return {
    index: () => {
      zframe.logger.info('HomeController index method ran');
      zframe.logger.log(_elements, zRouter);
    }
  };
}]);
