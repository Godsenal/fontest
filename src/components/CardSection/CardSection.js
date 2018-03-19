import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './CardSection.scss';

const cx = classNames.bind(styles);

export default class CardSection extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    header: PropTypes.string.isRequired,
  }

  render() {
    const { children, header } = this.props;
    const headerComp = header ? <h2 className={cx('header')}>{header}</h2> : null;
    return (
      <div className={cx('container')}>
        {headerComp}
        {children}
      </div>
    );
  }
}
