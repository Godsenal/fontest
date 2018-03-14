import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import GoHeart from 'react-icons/lib/go/heart';

import styles from './Header.scss';

const cx = classNames.bind(styles);

class Header extends Component {
  static propTypes = {
    collapse: PropTypes.bool.isRequired,
    scrollToElement: PropTypes.func.isRequired,
    scrollToPosition: PropTypes.func.isRequired,
  }
  render() {
    const { collapse, scrollToElement, scrollToPosition } = this.props;
    return (
      <div className={cx('header', { 'header-collapse': collapse })}>
        <div className={cx('header-wrapper')}>
          <div className={cx('logo-wrapper')}>
            <a onClick={() => scrollToPosition(0)} className={cx('logo')}>
              Fontest
            </a>
          </div>
          <div className={cx('menu-item')}>
            <a onClick={() => scrollToElement('_inputsection')}>Test!</a>
          </div>
          <div className={cx('menu-item')}>
            <a onClick={() => scrollToElement('_howtosection')}>How it works?</a>
          </div>
          <div className={cx('menu-item')}>
            <a onClick={() => this.scrollToElement('')}><GoHeart style={{ verticalAlign: 'baseline' }} /></a>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
