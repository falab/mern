import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// COMPONENTS
import App from './components/layouts/App/App';
import Home from './components/pages/Home/Home';
import Portfolio from './components/pages/Portfolio/Portfolio';
import Blog from './components/pages/Blog/Blog';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="portfolio" component={Portfolio} />
      <Route path="blog" component={Blog} />
    </Route>
  </Router>,
document.getElementById('app'));
