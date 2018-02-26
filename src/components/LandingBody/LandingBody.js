import React from 'react';
import classNames from 'classnames/bind';

import styles from './LandingBody.scss';

const cx = classNames.bind(styles);
const LandingBody = () => (
  <div className={cx('container')}>
    <div className={cx('header-wrapper')}>
      <h2 className={cx('header')}>Welcome to Fontest.</h2>
    </div>
    <div className={cx('sub-header-wrapper')}>
      <p className={cx('sub-header')}>
        여러 폰트들을 테스트해보세요. <br />
        Link 혹은 폰트파일만 있으면 준비는 끝났습니다. 다양한 레이아웃에 직접 써보며 폰트를 경험해 보세요.
      </p>
    </div>
    <div className={cx('content-wrapper')}>
      <input className={cx('input')} placeholder="Enter your link..." />
      <div className={cx('divider')}>
        OR
      </div>
      <a className={cx('button')}>Choose File</a>
    </div>
  </div>
);

export default LandingBody;
