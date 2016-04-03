import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// COMPONENTS
import App from './components/layouts/App/App';
import Home from './components/pages/Home/Home';
import Portfolio from './components/pages/Portfolio/Portfolio';
import Blog from './components/pages/Blog/Blog';
import NotFound from './components/pages/NotFound/NotFound';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="portfolio" component={Portfolio} />
      <Route path="blog" component={Blog} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>,
document.getElementById('app'));
