import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';

import LinkInput from '../../components/LinkInput';
import { loadFontLink } from '../../actions/font';
import styles from './Write.scss';

const cx = classNames.bind(styles);

class Write extends Component {
  componentDidMount() {
    if (this.props.location.state && this.props.location.state.link) {
      this.loadFont(this.props.location.state.link);
    }
  }
  loadFont = (link) => {
    this.props.loadFontLink(link, this.props.fontLoad.currentFonts);
  }
  renderLoading = () => (
    <div>
      <span>Loading...</span>
    </div>
  )
  render() {
    const { location, fontLoad } = this.props;
    const fontFamily = { fontFamily: `'${fontLoad.fontName}'` };
    return (
      <div className={cx('container')}>
        <div className={cx('inputWrapper')}>
          <LinkInput handleInputEnter={this.loadFont} />
        </div>
        <div className={cx('headerWrapper')}>
          <h1>OK! Let's Test.</h1>
        </div>
        {
          fontLoad.status === 'SUCCESS' ?
            <div className={cx('testWrapper')}>
              <textarea className={cx('testarea')} style={fontFamily} defaultValue="OK! Test it" />
            </div>
            :
            this.renderLoading()
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fontLoad: state.font.load,
});

const mapDispatchToProps = dispatch => ({
  loadFontLink: (link, currentFonts) => dispatch(loadFontLink(link, currentFonts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Write);

