zframe.module('main', function (_elements) {
  let data = {
    menuItems: [
      { path: '/', text: 'home' },
      { path: '/portfolio', text: 'portfolio' },
      { path: 'http://www.google.com', text: 'Google', remote: true}
    ]
  };

  _elements.app.innerHTML = zframe.Templates.application(data);
});
