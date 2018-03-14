import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './TestSection.scss';
import Dropdown from '../Dropdown';

const cx = classNames.bind(styles);
export default class TestSection extends Component {
  state = {
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    dropdown: [
      {
        id: 0,
        label: 'font-style',
        list: [
          { id: 0, value: 'normal', text: 'normal' },
          { id: 1, value: 'italic', text: 'italic' },
          { id: 2, value: 'oblique', text: 'oblique' },
        ],
      },
      {
        id: 1,
        label: 'font-weight',
        list: [
          { id: 0, value: 'normal', text: 'normal' },
          { id: 1, value: 'bold', text: 'bold' },
          { id: 2, value: 'bolder', text: 'bolder' },
          { id: 3, value: 'lighter', text: 'lighter' },
        ],
      },
    ],
  }
  static propTypes = {
    fontLoad: PropTypes.object.isRequired,
    scrollToInput: PropTypes.func.isRequired,
  }
  /*
    Change style to cliked item in dropdown.
  */
  handleItemClick = (value, label) => {
    switch (label) {
      case 'font-style':
        this.setState({
          fontStyle: value,
        });
        break;
      case 'font-weight':
        this.setState({
          fontWeight: value,
        });
        break;
      default:
    }
  }
  handleSlider = (e) => {
    this.setState({
      fontSize: parseInt(e.target.value, 10),
    });
  }
  /*
    Change render as fontLoad status.
    'INIT' or 'SUCCESS'.
    render nothing both 'WAITING' and 'FAILURE'.
  */
  renderBySwitch = (fontLoad) => {
    const { status, fontName } = fontLoad;
    switch (status) {
      case 'SUCCESS': {
        const { fontSize, fontStyle, fontWeight, dropdown } = this.state;
        const textStyle = {
          fontFamily: `'${fontName}'`,
          fontSize,
          fontStyle,
          fontWeight,
        };
        return (
          <div className={cx('testWrapper')}>
            <h2 className={cx('header')}>Test here!</h2>
            <div className={cx('setting')}>
              <div className={cx('slider')}>
                <input
                  type="range"
                  min="8"
                  max="64"
                  step="1"
                  value={fontSize}
                  onChange={this.handleSlider}
                />
                <span>{fontSize}px</span>
              </div>
              {
                dropdown.map((menu) => (
                  <Dropdown
                    key={menu.id}
                    label={menu.label}
                    list={menu.list}
                    handleItemClick={(value) => this.handleItemClick(value, menu.label)}
                  />
                ))
              }
            </div>
            <div className={cx('testarea-wrapper')}>
              <div className={cx('test-config')}>
                <div className={cx('config')}><span>font-size:</span> {fontSize}</div>
                <div className={cx('config')}><span>font-style:</span> {fontStyle}</div>
                <div className={cx('config')}><span>font-weight:</span> {fontWeight}</div>
              </div>
              <textarea
                className={cx('testarea')}
                style={textStyle}
                defaultValue={
                  'Test here.\n\n1. maxLength is 500.\n\n2. font-style and font-weight may not apply depending on your font.'
                }
                maxLength={500}
              />
            </div>
          </div>
        );
      }
      case 'INIT':
        return (
          <div className={cx('init')}>
            <button onClick={this.props.scrollToInput}>Add link or file first.</button>
          </div>
        );
      default:
        return null;
    }
  }
  render() {
    const { fontLoad } = this.props;
    return (
      <div className={cx('container')}>
        {this.renderBySwitch(fontLoad)}
      </div>
    );
  }
}

