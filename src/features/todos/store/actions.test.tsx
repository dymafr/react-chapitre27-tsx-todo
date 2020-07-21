import {
  EDIT_TODO_SUCCESS,
  editTodoSuccessAction,
  EDIT_TODO_ERROR,
  editTodoErrorAction,
  ADD_TODO_SUCCESS,
  tryAddTodoAction,
  ADD_TODO_ERROR,
} from './actions';

import configureMockStore from 'redux-mock-store';
import thunk, { ThunkMiddleware, ThunkDispatch } from 'redux-thunk';
import { saveTodos } from '../../../config/api.firebase';
import { GlobalTodoState } from '.';
import { AnyAction } from 'redux';

jest.mock('../../../config/api.firebase', () => ({
  saveTodos: jest.fn(),
}));

const saveTodosMock = saveTodos as jest.MockedFunction<typeof saveTodos>;

describe('test sync action', () => {
  test('should create editTodoSuccessAction action', () => {
    const index = 0;
    const todo = {
      name: 'test',
      done: false,
      editMode: false,
    };
    const action = {
      type: EDIT_TODO_SUCCESS,
      payload: {
        todo,
        index,
      },
    };
    expect(editTodoSuccessAction(todo, index)).toEqual(action);
  });

  test('should create editTodoErrorAction action', () => {
    const payload = new Error('error');
    const action = {
      type: EDIT_TODO_ERROR,
      payload,
    };
    expect(editTodoErrorAction(payload)).toEqual(action);
  });
});

describe('test async actions', () => {
  const initialState = { todos: { data: [], loading: false, error: false } };
  const mockStore = configureMockStore<
    GlobalTodoState,
    ThunkDispatch<GlobalTodoState, any, AnyAction>
  >([thunk]);
  test('should dispatch addTodoSuccessAction action', async () => {
    const store = mockStore(initialState);
    const payload = {
      name: 'test',
      done: false,
      editMode: false,
    };
    const action = {
      type: ADD_TODO_SUCCESS,
      payload,
    };

    await store.dispatch(tryAddTodoAction(payload));
    expect(saveTodosMock).toHaveBeenCalled();
    expect(store.getActions()[0]).toEqual(action);
  });

  test('should dispatch addTodoErrorAction action', async () => {
    const store = mockStore(initialState);
    const todo = {
      name: 'test',
      done: false,
      editMode: false,
    };
    const payload = new Error('error');
    const action = {
      type: ADD_TODO_ERROR,
      payload,
    };

    saveTodosMock.mockRejectedValueOnce(payload);

    try {
      await store.dispatch(tryAddTodoAction(todo));
    } catch (e) {
      expect(saveTodos).toHaveBeenCalled();
      expect(saveTodos).toThrowError(payload);
      expect(store.getActions()[0]).toEqual(action);
    }
  });
});
