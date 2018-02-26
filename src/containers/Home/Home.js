import React from 'react';
import classNames from 'classnames/bind';

import LandingBody from '../../components/LandingBody';
import LandingSide from '../../components/LandingSide';
import styles from './Home.scss';

const cx = classNames.bind(styles);

const Home = () => (
  <div className={cx('landing-container')}>
    <LandingBody />
    <LandingSide />
  </div>
);

export default Home;
