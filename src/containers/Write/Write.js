import React from 'react';
import classNames from 'classnames/bind';

import styles from './Write.scss';

const cx = classNames.bind(styles);

const Write = () => (
  <div className={cx('container')}>
    <span>Write page</span>
  </div>
);

export default Write;
