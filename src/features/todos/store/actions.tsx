import apiFirebase, { saveTodos } from '../../../config/api.firebase';
import {
  Todo,
  EditTodoErrorAction,
  AddTodoSuccessAction,
  AddTodoErrorAction,
  DeleteTodoSuccessAction,
  DeleteTodoErrorAction,
  RequestTodoAction,
  FetchTodoSuccessAction,
  FetchTodoErrorAction,
  ToggleEditModeAction,
  EditTodoSuccessAction,
} from '../../../interfaces';
import { Dispatch } from 'redux';
import { GlobalTodoState } from '.';

export const TOGGLE_EDIT_MODE = 'toggle edit mode';

export const TRY_DELETE_TODO = 'try delete todo';
export const DELETE_TODO_SUCCESS = 'delete todo success';
export const DELETE_TODO_ERROR = 'delete todo error';

export const TRY_EDIT_TODO = 'try edit todo';
export const EDIT_TODO_SUCCESS = 'edit todo success';
export const EDIT_TODO_ERROR = 'edit todo error';

export const TRY_ADD_TODO = 'try add todo';
export const ADD_TODO_SUCCESS = 'add todo success';
export const ADD_TODO_ERROR = 'add todo error';

export const REQUEST_TODO = 'request todo';
export const FETCH_TODO = 'fetch todo';
export const FETCH_TODO_SUCCESS = 'fetch todo success';
export const FETCH_TODO_ERROR = 'fetch todo error';

export const tryAddTodoAction = (todo: Todo) => {
  return async (dispatch: Dispatch, getState: () => GlobalTodoState) => {
    const todos = [...getState().todos.data, todo];
    try {
      await saveTodos(todos);
      dispatch(addTodoSuccessAction(todo));
    } catch (e) {
      dispatch(addTodoErrorAction(e));
    }
  };
};

export const tryEditTodoAction = (todo: Todo, index: number) => {
  return async (dispatch: Dispatch, getState: () => GlobalTodoState) => {
    const todos = getState().todos.data.map((t, i) => (i === index ? todo : t));
    try {
      await saveTodos(todos);
      dispatch(editTodoSuccessAction(todo, index));
    } catch (e) {
      dispatch(editTodoErrorAction(e));
    }
  };
};

export const editTodoSuccessAction = (
  todo: Todo,
  index: number
): EditTodoSuccessAction => {
  return {
    type: EDIT_TODO_SUCCESS,
    payload: {
      todo,
      index,
    },
  };
};

export const editTodoErrorAction = (error: any): EditTodoErrorAction => {
  return {
    type: EDIT_TODO_ERROR,
    payload: error,
  };
};

export const addTodoSuccessAction = (todo: Todo): AddTodoSuccessAction => {
  return {
    type: ADD_TODO_SUCCESS,
    payload: todo,
  };
};

export const addTodoErrorAction = (error: any): AddTodoErrorAction => {
  return {
    type: ADD_TODO_ERROR,
    payload: error,
  };
};

export const tryDeleteTodoAction = (index: number) => {
  return async (dispatch: Dispatch, getState: () => GlobalTodoState) => {
    const todos = getState().todos.data.filter((t, i) => i !== index);
    try {
      await saveTodos(todos);
      dispatch(deleteTodoSuccessAction(index));
    } catch (e) {
      dispatch(deleteTodoErrorAction(e));
    }
  };
};

export const deleteTodoSuccessAction = (
  index: number
): DeleteTodoSuccessAction => {
  return {
    type: DELETE_TODO_SUCCESS,
    payload: index,
  };
};

export const deleteTodoErrorAction = (error: any): DeleteTodoErrorAction => {
  return {
    type: DELETE_TODO_ERROR,
    payload: error,
  };
};

export const requestTodoAction = (): RequestTodoAction => {
  return {
    type: REQUEST_TODO,
  };
};

export const fetchTodoSuccessAction = (
  todos: Todo[]
): FetchTodoSuccessAction => {
  return {
    type: FETCH_TODO_SUCCESS,
    payload: todos,
  };
};

export const fetchTodoErrorAction = (error: any): FetchTodoErrorAction => {
  return {
    type: FETCH_TODO_ERROR,
    payload: error,
  };
};

export const fetchTodoAction = () => {
  return async (dispatch: Dispatch) => {
    dispatch(requestTodoAction());
    try {
      const response = await apiFirebase.get('todos.json');
      const data = response.data;
      dispatch(fetchTodoSuccessAction(data));
    } catch (e) {
      dispatch(fetchTodoErrorAction(e));
    }
  };
};

export const toggleEditModeAction = (index: number): ToggleEditModeAction => ({
  type: TOGGLE_EDIT_MODE,
  payload: index,
});
