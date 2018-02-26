import React from 'react';
import classNames from 'classnames/bind';

import styles from './LandingSide.scss';

const cx = classNames.bind(styles);
const LandingSide = () => (
  <div className={cx('container')}>
    <span>Side bar</span>
  </div>
);

export default LandingSide;
