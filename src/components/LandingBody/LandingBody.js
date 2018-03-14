import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';

import { loadFontLink, loadFontFile, clearFont } from '../../actions/font';
import LinkInput from '../LinkInput';
import FileInput from '../FileInput';
import CardSection from '../CardSection';
import TestSection from '../TestSection';
import styles from './LandingBody.scss';
import Header from '../../components/Header';
import Toast from '../../components/Toast';
import { scrollToTargetSmooth } from '../../utils/scroll';

const cx = classNames.bind(styles);
const DEFAULT_HEADER = 60; // Default header height for right sroll postion.
class LandingBody extends Component {
  state = {
    headerCollapse: false,
  }
  static propTypes = {
    clearFont: PropTypes.func.isRequired,
    fontLoad: PropTypes.object.isRequired,
    loadFontFile: PropTypes.func.isRequired,
    loadFontLink: PropTypes.func.isRequired,
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.checkHeaderCollpase();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  _testsection = null;
  makeToast = (message, type, time) => (
    this._toast.toastify({ message, type, time })
  )
  handleScroll = () => {
    this.checkHeaderCollpase();
  }
  handleInputEnter = (input) => {
    const id = this.makeToast('Wait for font loading...', 'loading', 0);
    const { fontLoad } = this.props;
    this.props.loadFontLink(input, fontLoad.currentFonts)
      .then(() => {
        if (this.props.fontLoad.status === 'SUCCESS') {
          this._toast.removeToast(id);
          this.makeToast('Successfully loaded!', 'success', 3000);
          if (this._testsection) {
            const { offsetTop } = this._testsection;
            this.scrollToPosition(offsetTop);
            // - ((window.innerHeight / 2) - (clientHeight / 2)) <- scroll to viewport that shows textarea at center.
            // scroll until element is placed at center of window viewport.
          }
        }
        else {
          this._toast.removeToast(id);
          this.makeToast(this.props.fontLoad.error, 'error', 3000);
        }
      })
      .catch(() => {
        this._toast.removeToast(id);
        this.makeToast(this.props.fontLoad.error, 'error', 3000);
      });
  }
  handleFileUpload = (file, type) => {
    const id = this.makeToast('Wait for font loading...', 'loading', 0);
    const { fontLoad } = this.props;
    this.props.loadFontFile(file, type, fontLoad.currentFonts)
      .then(() => {
        if (this.props.fontLoad.status === 'SUCCESS') {
          this._toast.removeToast(id);
          this.makeToast('Successfully loaded!', 'success', 3000);
          if (this._testsection) {
            const { offsetTop } = this._testsection;
            this.scrollToPosition(offsetTop);
            // - ((window.innerHeight / 2) - (clientHeight / 2)) <- scroll to viewport that shows textarea at center.
            // scroll until element is placed at center of window viewport.
          }
        }
        else {
          this._toast.removeToast(id);
          this.makeToast(this.props.fontLoad.error, 'error', 3000);
        }
      });
  }
  /* remove style sheet */
  handleClear = () => {
    this.props.clearFont();
    this.makeToast('Successfully Clear!', 'success', 3000);
  }
  checkHeaderCollpase= () => {
    const top = window.pageYOffset || document.documentElement.scrollTop;
    if (top >= 60 && !this.state.headerCollapse) {
      this.setState({
        headerCollapse: true,
      });
    }
    else if (top <= 60 && this.state.headerCollapse) {
      this.setState({
        headerCollapse: false,
      });
    }
  }
  scrollToPosition = (position) => {
    const top = window.pageYOffset || document.documentElement.scrollTop; // current scroll top positing.
    if (position >= 0) {
      scrollToTargetSmooth(top, position - DEFAULT_HEADER, 300); // Mover more for avoiding header.
    }
  }
  scrollToElement = (element) => {
    const top = window.pageYOffset || document.documentElement.scrollTop; // current scroll top positing.
    if (element in this && this[element]) {
      scrollToTargetSmooth(top, this[element].offsetTop - DEFAULT_HEADER, 300); // Mover more for avoiding header.
    }
  }
  renderInput = () => (
    <div className={cx('input-container')}>
      <LinkInput handleInputEnter={this.handleInputEnter} />
      <div className={cx('divider')}>
        OR
      </div>
      <FileInput handleFileUpload={this.handleFileUpload} />
    </div>
  )
  render() {
    const { headerCollapse } = this.state;
    const { fontLoad } = this.props;
    return (
      <div className={cx('container')} onScroll={this.handleScroll}>
        <Header collapse={headerCollapse} scrollToElement={this.scrollToElement} scrollToPosition={this.scrollToPosition} />
        <div className={cx('header-wrapper')}>
          <h2 className={cx('header')}>Fontest</h2>
        </div>
        <div className={cx('sub-header-wrapper')}>
          <p className={cx('sub-header')}>
            Type a link to css or font file.{'\n'}
            Or drop local font file.{'\n'}
            Then You can test it!
          </p>
        </div>
        <div ref={ref => { this._inputsection = ref; }}>
          <CardSection header="Let's Start!">
            {this.renderInput()}
            {fontLoad.status === 'SUCCESS' ?
              <div ref={ref => { this._testsection = ref; }}>
                <TestSection fontLoad={fontLoad} scrollToInput={() => this.scrollToElement(this._inputsection)} />
              </div> :
              null
            }
            <a className={cx('button')} onClick={this.handleClear}>Clear styles.</a>
          </CardSection>
        </div>
        <div ref={ref => { this._howtosection = ref; }}>
          <CardSection header="How it works?">
            <p className={cx('paragraph')}>
              <span>CSS with a link : </span>{'\n'} Extract @font-face declaration only.{'\n'}
              <span>Font file with a link or a local file : </span>{'\n'} Base64 encode font file and directly add @font-face to the stylesheet.{'\n'}
            </p>
          </CardSection>
        </div>
        <div ref={ref => { this._madebysection = ref; }}>
          <CardSection header="Made by">
            <p className={cx('paragraph')}>
              Made by <span>Godsenal</span>{'\n'}
              Check out <span><a href="https://github.com/Godsenal/fontest">-Github repository-</a></span>{'\n'}
            </p>
          </CardSection>
        </div>
        <Toast ref={ref => { this._toast = ref; }} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fontLoad: state.font.load,
});

const mapDispatchToProps = dispatch => ({
  loadFontLink: (link, currentFonts) => (
    dispatch(loadFontLink(link, currentFonts))
  ),
  loadFontFile: (file, type, currentFont) => (
    dispatch(loadFontFile(file, type, currentFont))
  ),
  clearFont: () => dispatch(clearFont()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingBody);
