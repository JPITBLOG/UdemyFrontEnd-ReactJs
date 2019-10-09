import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from './store';
import './index.css';
import App from './container/App/App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
// If you want your app to work offline and load faster, you can change
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
