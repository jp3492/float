import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import logger from 'redux-logger'

import App from './comps/App'
import reducer from './reducers/index'

const config = { key: 'root', storage, stateReconciler: autoMergeLevel2 }
const persistedReducer = persistReducer(config, reducer)
const store = createStore(persistedReducer, {}, applyMiddleware(thunk, logger))
const persistor = persistStore(store)

// persistor.purge()
// persistor.flush()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
    document.querySelector('#root'));
