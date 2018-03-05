import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';

import history from '../../utils/history';
import { loadFontFile } from '../../actions/font';
import LinkInput from '../LinkInput';
import FileInput from '../FileInput';
import styles from './LandingBody.scss';

const cx = classNames.bind(styles);
class LandingBody extends Component {
  handleFileUpload = (file, type) => {
    this.props.loadFontFile(file, type)
      .then(() => {
        history.push('/write');
      });
  }
  render() {
    return (
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
          <LinkInput
            handleInputEnter={(inputVal) => history.push('/write', { link: inputVal })}
          />
          <div className={cx('divider')}>
            OR
          </div>
          <FileInput handleFileUpload={this.handleFileUpload} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fontLoad: state.font.load,
});

const mapDispatchToProps = dispatch => ({
  loadFontFile: (file, type) => (
    dispatch(loadFontFile(file, type))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingBody);
