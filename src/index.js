import React from 'react';
import ReactDOM from 'react-dom';

import Root from './containers/Root';
import configureStore from './store/configureStore';
import './styles/main.scss';

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('app')
);
