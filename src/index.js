import React from 'react';
import ReactDOM from 'react-dom';

import Root from './containers/Root';
import history from './utils/history';
import configureStore from './store/configureStore';
import './styles/main.scss';

const store = configureStore();

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('app')
);
