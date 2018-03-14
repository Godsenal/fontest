import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './App.scss';
import Home from '../Home';
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
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }
  handleWindowResize = () => {
    this.props.changeWidthAndHeight();
  }
  render() {
    return (
      <div className={cx('container')}>
        <Home />
        { /*
            Useless route now. Leaved it for further use.
            <Route path="/write" component={Write} />
          */
        }
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
