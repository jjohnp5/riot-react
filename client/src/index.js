import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reducers  from './reducers'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux'

const store = createStore(reducers, applyMiddleware(thunk, store => next => action => {
    console.group(action.type);
    console.log('The action:', action);
    const result = next(action);
    console.log('The new state: ', store.getState());
    console.groupEnd()
    return result;
}))
console.log(store);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById("root"));
