import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Header.scss';

const cx = classNames.bind(styles);

const Header = () => (
  <div className={cx('header')}>
    <div className={cx('header-wrapper')}>
      <Link to="/" className={cx('logo-wrapper')}>
        Fontest
      </Link>
    </div>
  </div>
);

export default Header;
