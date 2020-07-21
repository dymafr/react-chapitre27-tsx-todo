import { Action } from 'redux';

export interface AuthState {
  isLoggedin: boolean;
}

export const authReducer = (
  state: AuthState = { isLoggedin: false },
  action: Action
): AuthState => {
  return state;
};
