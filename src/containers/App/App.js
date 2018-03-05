import React, { Component } from 'react';
import {
  Route,
} from 'react-router-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './App.scss';
import Header from '../../components/Header';
import Home from '../Home';
import Write from '../Write';
import { changeWidthAndHeight } from '../../actions/environment';

const cx = classNames.bind(styles);

class App extends Component {
  static propTypes = {
    changeWidthAndHeight: PropTypes.func,
  }
  static defaultProps = {
    changeWidthAndHeight: undefined,
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }
  handleWindowResize = () => {
    this.props.changeWidthAndHeight();
  }
  render() {
    return (
      <div className={cx('container')}>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/write" component={Write} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeWidthAndHeight: () => {
    dispatch(changeWidthAndHeight());
  },
});

export default connect(null, mapDispatchToProps)(App);
