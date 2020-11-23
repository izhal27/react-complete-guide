import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  isLoggedin: false,
  authRedirectPath: '/',
};

const authStart = state => {
  return {
    ...state,
    loading: true,
  };
};

const authSuccess = (state, { token, userId }) => {
  return {
    ...state,
    token,
    userId,
    error: null,
    loading: false,
  };
};

const authFail = (state, { error }) => {
  return {
    ...state,
    loading: false,
    error,
  };
};

const authLogout = state => {
  return {
    ...state,
    token: null,
    userId: null,
  };
};

const setAuthRedirectPath = (state, { path }) => {
  return {
    ...state,
    authRedirectPath: path,
  };
};

const reducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
