import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// COMPONENTS
import AppLayout from './components/AppLayout/AppLayout';
import HomePage from './components/HomePage/HomePage';
import PortfolioPage from './components/PortfolioPage/PortfolioPage';
import BlogPage from './components/BlogPage/BlogPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={AppLayout}>
      <IndexRoute component={HomePage} />
      <Route path="portfolio" component={PortfolioPage} />
      <Route path="blog" component={BlogPage} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Router>,
document.getElementById('app'));
