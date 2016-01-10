app.module('init', ['xhr', (xhr) => {
  return () => {
    xhr('http://www.google.com');
  };
}]);
