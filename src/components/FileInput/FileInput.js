import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Dropzone from 'react-dropzone';
import styles from './FileInput.scss';

const cx = classNames.bind(styles);

export default class FileInput extends Component {
  static propTypes = {
    handleFileUpload: PropTypes.func,
  }
  static defaultPropts = {
    handleFileUpload: undefined,
  }
  handleFileDrop = (files) => {
    if (files[0]) {
      const file = files[0];
      const { type } = file;
      this.props.handleFileUpload(file, type);
    }
  }
  render() {
    return (
      <div className={cx('container')}>
        <Dropzone className={cx('dropzone')} onDrop={this.handleFileDrop} multiple={false}>
          <p className={cx('dropzone-inner')}>Drop your file here</p>
        </Dropzone>
      </div>
    );
  }
}
