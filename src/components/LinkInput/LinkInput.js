import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './LinkInput.scss';

const cx = classNames.bind(styles);
const checkurl = new RegExp('^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?' + // port
  '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
  '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
  '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
export default class LinkInput extends PureComponent {
  state = {
    inputVal: '',
  }
  static propTypes = {
    handleInputEnter: PropTypes.func,
  }
  static defaultProps = {
    handleInputEnter: undefined,
  }
  handleChange = (e) => {
    this.setState({
      inputVal: e.target.value,
    });
  }
  handleKeyPress = (e) => {
    
    if (e.key === 'Enter') {
      const { inputVal } = this.state;
      const link = inputVal.trim();
      if (checkurl.test(link)) {
        this.props.handleInputEnter(this.state.inputVal);
      }
      // Let user knoe it's Not url...
      this.setState({
        inputVal: '',
      });
    }
  }
  render() {
    const { inputVal } = this.state;
    return (
      <div className={cx('container')}>
        <input
          className={cx('input')}
          value={inputVal}
          placeholder="Enter your link..."
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }
}

