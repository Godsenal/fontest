import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Dropdown.scss';

const cx = classNames.bind(styles);
export default class Dropdown extends Component {
  state = {
    open: false,
  }
  static propTypes = {
    handleItemClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
  }
  componentDidMount() {
    window.addEventListener('mousedown', this.handleClickOutside);
  }
  openDropdown = () => {
    this.setState({
      open: !this.state.open,
    });
  }
  handleClick = (value) => {
    this.setState({
      open: false,
    });
    this.props.handleItemClick(value);
  }
  handleClickOutside = (e) => {
    if (!this.state.open) {
      return;
    }
    if (this._dropdown && !this._dropdown.contains(e.target)) {
      this.setState({
        open: false,
      });
    }
  }
  render() {
    const { open } = this.state;
    const { label, list } = this.props;
    return (
      <div className={cx('dropdown-wrapper')} ref={ref => { this._dropdown = ref; }}>
        <a className={cx('dropdown-button', { 'dropdown-open': open, 'dropdown-close': !open })} onClick={this.openDropdown}>
          <span>{label}</span>
        </a>
        <ul className={cx('dropdown-list', { show: open })}>
          {
            list.map(item => (
              <li key={item.id}>
                <a onClick={() => this.handleClick(item.value)}>{ item.text }</a>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

