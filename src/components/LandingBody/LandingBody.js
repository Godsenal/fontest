import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';

import history from '../../utils/history';
import { loadFontFile, clearFont } from '../../actions/font';
import LinkInput from '../LinkInput';
import FileInput from '../FileInput';
import CardSection from '../CardSection';
import styles from './LandingBody.scss';
import { scrollToTargetSmooth } from '../../utils/scroll';

const cx = classNames.bind(styles);
class LandingBody extends Component {
  handleFileUpload = (file, type) => {
    this.props.loadFontFile(file, type, this.props.fontLoad.currentFonts)
      .then(() => {
        history.push('/write');
      });
  }
  handleScroll = () => {
    const top = window.pageYOffset || document.documentElement.scrollTop; // current scroll top positing.
    const { description } = this;
    if (description) {
      scrollToTargetSmooth(top, description.offsetTop, 250);
    }
  }
  render() {
    return (
      <div className={cx('container')}>
        <div className={cx('header-wrapper')}>
          <h2 className={cx('header')}>Fontest</h2>
        </div>
        <div className={cx('sub-header-wrapper')}>
          <p className={cx('sub-header')}>
            Test your Font.
          </p>
        </div>
        <div ref={ref => { this.main = ref; }}>
          <CardSection header="Let's Test!">
            <LinkInput
              handleInputEnter={(inputVal) => history.push('/write', { link: inputVal })}
            />
            <div className={cx('divider')}>
              OR
            </div>
            <FileInput handleFileUpload={this.handleFileUpload} />
            <a className={cx('button')} onClick={this.props.clearFont}>CLEAR!</a>
          </CardSection>
        </div>
        <div ref={ref => { this.description = ref; }}>
          <CardSection header="How it works?">
            <p>
              Fontest uses base64 encoding
            </p>
          </CardSection>
        </div>
        <a className={cx('fab')} onClick={this.handleScroll}>
          Go
        </a>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fontLoad: state.font.load,
});

const mapDispatchToProps = dispatch => ({
  loadFontFile: (file, type, currentFont) => (
    dispatch(loadFontFile(file, type, currentFont))
  ),
  clearFont: () => dispatch(clearFont()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingBody);
