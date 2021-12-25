import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './redux/reducers';
import thunk from 'redux-thunk';

const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.render( 
    <BrowserRouter >
        <Provider store={store}>
            <App / >
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);