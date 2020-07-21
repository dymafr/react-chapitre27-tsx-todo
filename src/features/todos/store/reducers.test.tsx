import { todosReducer, initialState } from './reducers';
import { ADD_TODO_SUCCESS, ADD_TODO_ERROR } from './actions';
import { AddTodoSuccessAction, AddTodoErrorAction } from '../../../interfaces';
import { TodoActionType } from '../../../types';

describe('test todos reducers', () => {
  test('should return initialState', () => {
    expect(todosReducer(undefined, {} as TodoActionType)).toEqual(initialState);
  });

  test('should add a new todo', () => {
    const todo = { name: 'test', done: false, editMode: false };
    const action: AddTodoSuccessAction = {
      type: ADD_TODO_SUCCESS,
      payload: todo,
    };
    expect(todosReducer(initialState, action)).toEqual({
      data: [todo],
      loading: false,
      error: null,
    });
  });

  test('should set an error', () => {
    const error = new Error('error');
    const action: AddTodoErrorAction = {
      type: ADD_TODO_ERROR,
      payload: error,
    };
    expect(todosReducer(initialState, action)).toEqual({
      data: [],
      loading: false,
      error,
    });
  });
});
