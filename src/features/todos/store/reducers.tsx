import * as actions from './actions';
import { Todo } from '../../../interfaces';
import { TodoActionType } from '../../../types';

export interface TodosState {
  data: Todo[];
  loading: boolean;
  error: any;
}

export const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const todosReducer = (
  state: TodosState = initialState,
  action: TodoActionType
) => {
  switch (action.type) {
    case actions.ADD_TODO_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
      };
    }
    case actions.EDIT_TODO_SUCCESS: {
      const { index, todo } = action.payload;
      return {
        ...state,
        loading: false,
        data: state.data.map((t, i) => (i === index ? todo : t)),
      };
    }

    case actions.DELETE_TODO_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        loading: false,
        data: state.data.filter((t, i) => i !== payload),
      };
    }
    case actions.DELETE_TODO_ERROR:
    case actions.FETCH_TODO_ERROR:
    case actions.EDIT_TODO_ERROR:
    case actions.ADD_TODO_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case actions.TOGGLE_EDIT_MODE: {
      const { payload } = action;
      return {
        ...state,
        data: [
          ...state.data.map((t, i) =>
            i === payload ? { ...t, editMode: !t.editMode } : t
          ),
        ],
      };
    }
    case actions.REQUEST_TODO: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.FETCH_TODO_SUCCESS: {
      if (action.payload) {
        return {
          ...state,
          data: [
            ...state.data,
            ...action.payload.map((t) => ({ ...t, editMode: false })),
          ],
          loading: false,
          error: null,
        };
      } else {
        return {
          ...state,
          loading: false,
        };
      }
    }
    default: {
      return state;
    }
  }
};
