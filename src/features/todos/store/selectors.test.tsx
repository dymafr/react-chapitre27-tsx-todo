import { todosSelector, todosListSelector } from './selectors';

describe('test todos selectors', () => {
  test('should return todos state', () => {
    const initialState = {
      todos: {
        data: [],
        loading: false,
        error: null,
      },
      auth: {
        isLoggedin: false,
      },
    };
    expect(todosSelector(initialState)).toEqual({
      data: [],
      loading: false,
      error: null,
    });
  });

  test('should return todos list', () => {
    const todo = { name: 'test', done: false, editMode: false };
    const initialState = {
      todos: {
        data: [todo],
        loading: false,
        error: null,
      },
      auth: {
        isLoggedin: false,
      },
    };
    expect(todosListSelector(initialState)).toEqual([todo]);
  });
});
