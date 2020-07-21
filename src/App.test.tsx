import React from 'react';
import App from './App';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Route } from 'react-router-dom';
import apiFirebase from './config/api.firebase';
import { createNewMockStore, WithReduxAndRouter } from './config/test.helpers';
import { Location } from 'history';

jest.mock('./config/api.firebase');
const apiFirebaseMock = apiFirebase as jest.Mocked<typeof apiFirebase>;

const todos = [
  {
    name: 'todoTest is active',
    done: false,
  },
  {
    name: 'todoTest is done',
    done: true,
  },
];

describe('<App />', () => {
  let store;
  beforeEach(() => {
    store = createNewMockStore();
  });
  afterEach(cleanup);

  test('should display all todos on /', async () => {
    apiFirebaseMock.get.mockResolvedValueOnce({ data: todos });
    let l: Location;

    const { findByText, getAllByText } = render(
      <>
        <App />
        <Route
          path="*"
          render={({ location }) => {
            l = location;
            return null;
          }}
        />
      </>,
      {
        wrapper: ({ children }) => (
          <WithReduxAndRouter path={['/']}>{children}</WithReduxAndRouter>
        ),
      }
    );

    await findByText(/ajouter une todo/i);
    expect(l!.pathname).toBe('/todos/all');
    expect(apiFirebaseMock.get).toHaveBeenCalled();
    expect(getAllByText(/todotest/i).length).toBe(2);
  });

  test('should display done todos on /todos/done', async () => {
    apiFirebaseMock.get.mockResolvedValueOnce({ data: todos });
    let l: Location;

    const { findByText, getAllByText, getByText, queryByText } = render(
      <>
        <App />
        <Route
          path="*"
          render={({ location }) => {
            l = location;
            return null;
          }}
        />
      </>,
      {
        wrapper: ({ children }) => (
          <WithReduxAndRouter path={['/']}>{children}</WithReduxAndRouter>
        ),
      }
    );

    await findByText(/ajouter une todo/i);
    expect(apiFirebaseMock.get).toHaveBeenCalled();
    expect(l!.pathname).toBe('/todos/all');
    fireEvent.click(getByText(/fini/i));
    expect(l!.pathname).toBe('/todos/done');
    expect(getAllByText(/todotest/i).length).toBe(1);
    expect(getByText(/is done/i)).toBeInTheDocument();
    expect(queryByText(/is active/i)).toBeNull();
  });

  test('should display not done todos on /todos/active', async () => {
    apiFirebaseMock.get.mockResolvedValueOnce({ data: todos });
    let l: Location;

    const { findByText, getAllByText, getByText, queryByText } = render(
      <>
        <App />
        <Route
          path="*"
          render={({ location }) => {
            l = location;
            return null;
          }}
        />
      </>,
      {
        wrapper: ({ children }) => (
          <WithReduxAndRouter path={['/']}>{children}</WithReduxAndRouter>
        ),
      }
    );

    await findByText(/ajouter une todo/i);
    expect(apiFirebaseMock.get).toHaveBeenCalled();
    expect(l!.pathname).toBe('/todos/all');
    fireEvent.click(getByText(/en cours/i));
    expect(l!.pathname).toBe('/todos/active');
    expect(getAllByText(/todotest/i).length).toBe(1);
    expect(queryByText(/is done/i)).toBeNull();
    expect(getByText(/is active/i)).toBeInTheDocument();
  });
});
