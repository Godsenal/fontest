import React, { Component } from 'react';

import ToastItem from './ToastItem';

export default class Toast extends Component {
  state = {
    toasts: [], // array for saving toast object. will be render in map function.
  }
  _uniqueID = 0;
  getToast = (props) => ({
    ...props,
    unmount: false,
  });
  toastify = ({
    message, // display message in toast
    type, // type : ['success', 'error', 'loading] for color theme.
    time, // message display time.
    onStart, // onStart callback. right after mount.
    onStarted, // onStarted callback. right after end of transition.
    onEnd, // onEnd callback. right before unmount transition.
    onEnded, // onEnd callbaack. right before unmount.
  }) => {
    this._uniqueID = this._uniqueID + 1; // unique id for each toast.
    const toast = this.getToast({ id: this._uniqueID, message, type, time, onStart, onStarted, onEnd, onEnded });
    this.addToast(toast); // add toast to array.
    return toast.id; // return toast id. can remove toast by this id.
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
  /*
    unmount all toast.
    doesn't delete directly for unmount transition.
  */
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
