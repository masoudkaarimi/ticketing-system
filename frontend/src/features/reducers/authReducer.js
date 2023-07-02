import {
  AUTH_FAILED,
  AUTH_SUCCESS,
  LOAD_USER_FAILED,
  LOAD_USER_SUCCESS,
  LOADING_PROGRESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REFRESH_FAILED,
  REFRESH_SUCCESS,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
} from "../types/authTypes.js";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOADING_PROGRESS:
      return { ...state, isLoading: true };

    case REGISTER_SUCCESS:
      return { ...state, isLoading: false };
    case REGISTER_FAILED:
      return initialState;

    case LOGIN_SUCCESS:
      return { ...state, isLoading: false, isAuthenticated: true };
    case LOGIN_FAILED:
      return initialState;

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: payload,
      };
    case LOAD_USER_FAILED:
      return initialState;

    case AUTH_SUCCESS:
      return { ...state, isAuthenticated: true };
    case AUTH_FAILED:
      return initialState;

    case REFRESH_SUCCESS:
      return { ...state };
    case REFRESH_FAILED:
      return initialState;

    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
