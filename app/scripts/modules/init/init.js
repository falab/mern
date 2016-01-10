app.module('init', ['TestModule', (TestModule) => {
  return function () {
    window.alert(TestModule);
  };
}]);
