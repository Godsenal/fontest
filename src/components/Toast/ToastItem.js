import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './ToastItem.scss';

const cx = classNames.bind(styles);

export default class ToastItem extends Component {
  state = {
    mount: false,
    unmount: false,
  }
  static propTypes = {
    deleteToast: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    message: PropTypes.string,
    onEnd: PropTypes.func,
    onEnded: PropTypes.func,
    onStart: PropTypes.func,
    onStarted: PropTypes.func,
    time: PropTypes.number,
    type: PropTypes.string,
    unmount: PropTypes.bool,
  }
  static defaultProps = {
    message: 'deafult message',
    onStart: () => {},
    onStarted: () => {},
    onEnd: () => {},
    onEnded: () => {},
    unmount: false,
    time: 3000,
    type: 'success',
  }
  componentDidMount() {
    const { onStart, onEnd, time } = this.props;
    /* unmount by end of time */
    if (time > 0) {
      this._unmountTime = setTimeout(() => {
        this.setState({
          unmount: true,
        }, () => onEnd()); // end callback
      }, time);
    }
    /* unmount by user's desire */
    this._mountTime = setTimeout(() => {
      this.setState({
        mount: true,
      }, () => onStart()); // start callback
    }, 10);
  }
  /* when unmount by user */
  componentWillReceiveProps(nextProps) {
    if (nextProps.unmount) {
      nextProps.onEnd();
    }
  }
  componentWillUnmount() {
    clearTimeout(this._mountTime);
    clearTimeout(this._unmountTime);
  }
  /* prevent onTransitionEnd calling twice */
  _mounted = false;
  _unmounted = false;
  _mountTime = null;
  _unmountTime = null;
  onTransitionEnd = () => {
    const { mount } = this.state;
    const { onStarted, onEnded, unmount } = this.props;
    if ((unmount || this.state.unmount) && !this._unmounted) {
      this._unmounted = true;
      onEnded();
      this.props.deleteToast(this.props.id);
    }
    else if (mount && !this._mounted) {
      this._mounted = true;
      onStarted();
    }
  }
  getStyleByColor = () => {
    const { type } = this.props;
    switch (type) {
      case 'success':
        return ({
          color: '#fff',
          backgroundColor: '#148c4d',
        });
      case 'error':
        return ({
          color: '#fff',
          backgroundColor: '#d9411f',
        });
      default:
        return {};
    }
  }
  render() {
    const { mount, unmount } = this.state;
    const { message } = this.props;
    const unmountProps = this.props.unmount;
    return (
      <div
        className={cx('container', { 'container-mount': mount, 'container-unmount': unmount || unmountProps })}
        onTransitionEnd={this.onTransitionEnd}
      >
        <div className={cx('content')} style={this.getStyleByColor()}>
          <span>{message}</span>
        </div>
      </div>
    );
  }
}

