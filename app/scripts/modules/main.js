app.module('main', ['xhr', (xhr) => {
  app.logger.info('main loaded!!!');
  xhr('http://www.google.com');
}]);
