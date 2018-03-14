import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './LinkInput.scss';

const cx = classNames.bind(styles);
const AVAILABLE_TYPE = ['css', 'woff', 'woff2', 'ttf', 'otf'];
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
      this.props.handleInputEnter(link);
    }
  }
  render() {
    const { inputVal } = this.state;
    return (
      <div className={cx('container')}>
        <p className={cx('types')}>
          {
            AVAILABLE_TYPE.map((type, i, arr) => <span key={i}>*.{type}{arr.length - 1 !== i ? ', ' : ''}</span>)
          }
        </p>
        <input
          className={cx('input')}
          value={inputVal}
          placeholder="Type your link..."
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }
}

