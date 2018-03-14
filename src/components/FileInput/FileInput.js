import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Dropzone from 'react-dropzone';
import styles from './FileInput.scss';

const cx = classNames.bind(styles);
const AVAILABLE_TYPE = ['woff', 'woff2', 'ttf', 'otf'];

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
        <p className={cx('types')}>
          {
            AVAILABLE_TYPE.map((type, i, arr) => <span key={i}>*.{type}{arr.length - 1 !== i ? ', ' : ''}</span>)
          }
        </p>
        <Dropzone className={cx('dropzone')} onDrop={this.handleFileDrop} multiple={false}>
          <p className={cx('dropzone-inner')}>Drop your file here</p>
        </Dropzone>
      </div>
    );
  }
}
