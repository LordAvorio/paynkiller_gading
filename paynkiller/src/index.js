import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter } from 'react-router-dom'

import 'rsuite/dist/styles/rsuite-default.css'

import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'
import allReducer from './reducers'

let globalState = createStore(allReducer, applyMiddleware(ReduxThunk))
globalState.subscribe(() => console.log("Global State : ", globalState.getState()))

ReactDOM.render(
  <Provider store={globalState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)


