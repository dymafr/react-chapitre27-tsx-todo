import {
  EditTodoSuccessAction,
  EditTodoErrorAction,
  AddTodoSuccessAction,
  AddTodoErrorAction,
  DeleteTodoSuccessAction,
  DeleteTodoErrorAction,
  RequestTodoAction,
  FetchTodoSuccessAction,
  FetchTodoErrorAction,
  ToggleEditModeAction,
} from '../interfaces';

export type TodoActionType =
  | EditTodoSuccessAction
  | EditTodoErrorAction
  | AddTodoSuccessAction
  | AddTodoErrorAction
  | DeleteTodoSuccessAction
  | DeleteTodoErrorAction
  | RequestTodoAction
  | FetchTodoSuccessAction
  | FetchTodoErrorAction
  | ToggleEditModeAction;
