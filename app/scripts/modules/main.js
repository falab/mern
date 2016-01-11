zframe.module('main', () => {
  let appContainer = document.getElementById('app');

  let data = {
    menuItems: [
      { path: '/', text: 'home' },
      { path: '/portfolio', text: 'portfolio' },
      { path: 'http://www.google.com', text: 'Google', remote: true}
    ]
  };

  appContainer.innerHTML = zframe.Templates.application(data);
});
