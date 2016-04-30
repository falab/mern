import React from 'react';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppLayout from 'AppLayout';
import HomePage from 'HomePage';
import PortfolioPage from 'PortfolioPage';
import BlogPage from 'BlogPage';
import NotFoundPage from 'NotFoundPage';

export default class AppRoutes extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={AppLayout}>
          <IndexRoute component={HomePage} />
          <Route path="portfolio" component={PortfolioPage} />
          <Route path="blog" component={BlogPage} />
          <Route path="*" component={NotFoundPage} />
        </Route>
      </Router>
    );
  }
}
