import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { authReducer } from '../store/reducers';
import { todosReducer } from '../features/todos/store/reducers';
import thunk from 'redux-thunk';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

export const createNewMockStore = () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      todos: todosReducer,
    }),
    applyMiddleware(thunk)
  );
  return store;
};

export const WithReduxAndRouter = ({
  path,
  children,
}: {
  path: string[];
  children: ReactNode;
}) => {
  const store = createNewMockStore();
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={path}>{children}</MemoryRouter>
    </Provider>
  );
};
