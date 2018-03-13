import React, { Component } from 'react';

import ToastItem from './ToastItem';

export default class Toast extends Component {
  state = {
    toasts: [],
  }
  _uniqueID = 0;
  getToast = (props) => ({
    ...props,
    unmount: false,
  });
  toastify = ({
    message,
    type,
    time,
    onStart,
    onStarted,
    onEnd,
    onEnded,
  }) => {
    this._uniqueID = this._uniqueID + 1;
    const toast = this.getToast({ id: this._uniqueID, message, type, time, onStart, onStarted, onEnd, onEnded });
    this.addToast(toast);
    return toast.id;
  }
  addToast = (toast) => {
    this.setState((prevState) => ({
      toasts: [...prevState.toasts, toast],
    }));
  }
  /* set unmount true for toast's unmount transition */
  removeToast = (id) => {
    this.setState((prevState) => ({
      toasts: prevState.toasts.map((toast) => (toast.id === id ? { ...toast, unmount: true } : toast)),
    }));
  }
  /* delete Toast from array */
  deleteToast = (id) => {
    this.setState((prevState) => ({
      toasts: prevState.toasts.filter((toast) => (toast.id !== id)),
    }));
  }
  clear = () => {
    this.setState((prevState) => ({
      toasts: prevState.toasts.map((toast) => ({ ...toast, unmount: true })),
    }));
  }
  render() {
    const { toasts } = this.state;
    return (
      <div>
        {
          toasts.map((toast) => (
            React.createElement(ToastItem, {
              ...toast,
              key: toast.id,
              deleteToast: this.deleteToast,
            })
          ))
        }
      </div>
    );
  }
}
