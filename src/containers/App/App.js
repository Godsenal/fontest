import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './App.scss';
import Header from '../../components/Header';
import Home from '../Home';
import Write from '../Write';

const cx = classNames.bind(styles);

const App = () => (
  <Router>
    <div className={cx('container')}>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/write" component={Write} />
    </div>
  </Router>
);

export default App;
