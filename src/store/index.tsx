import * as reducers from './reducers';
import { combineReducers, Middleware, Store, Reducer } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunkMiddleware from 'redux-thunk';

const appReducer = combineReducers(reducers);
const middlewares: Middleware[] = [thunkMiddleware];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

type MyStore = Store & { asyncReducers: { [key: string]: Reducer } };

export const store: MyStore = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
) as MyStore;

store.asyncReducers = {};

const createInjectReducer = (store: MyStore) => (
  key: string,
  reducer: Reducer
) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(
    combineReducers({ ...reducers, ...store.asyncReducers })
  );
};

export const injectReducer = createInjectReducer(store);

export default store;
