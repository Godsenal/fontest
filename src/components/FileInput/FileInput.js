import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './FileInput.scss';

const cx = classNames.bind(styles);

export default class FileInput extends Component {
  static propTypes = {
    handleFileUpload: PropTypes.func,
  }
  static defaultPropts = {
    handleFileUpload: undefined,
  }
  handleClick = () => {
    if (this.file) {
      this.file.click();
    }
  }
  handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const split = file.name.split('.');
      const type = split[split.length - 1];
      if (type === 'woff' ||
          type === 'woff2' ||
          type === 'ttf' ||
          type === 'otf' ||
          type === 'eot') {
        this.props.handleFileUpload(file, type);
      }
      else {
        console.log('fail');
      }
    }
  }
  render() {
    return (
      <div className={cx('container')}>
        <a className={cx('button')} onClick={this.handleClick}>Choose File</a>
        <form encType="multipart/form-data">
          <input
            className={cx('input')}
            ref={ref => { this.file = ref; }}
            type="file"
            onChange={this.handleFileChange}
          />
        </form>
      </div>
    );
  }
}
