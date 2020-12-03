import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from './store/store'
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { checkLoggedIn } from "./util/session";

// let preloadedState = {};

const renderApp = preloadedState => {
  const store = configureStore(preloadedState);
  window.state = store.getState;

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
    );
  };

(async () => renderApp(await checkLoggedIn()))();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
