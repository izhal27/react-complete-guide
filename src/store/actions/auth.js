import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const checkTimeoutAuth = timoutTime => {
  return dispatch => {
    setTimeout(() => dispatch(logout()), timoutTime * 1000);
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const auth = (email, password, isSignup) => {
  return async dispatch => {
    const API_KEY = 'AIzaSyAfbQBS9KjC9mBjGUbX2gopfIQlneZu-uU';
    dispatch(authStart());
    try {
      const authData = {
        email,
        password,
        returnSecureToken: true,
      };
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
      // signin
      if (!isSignup) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
      }

      const res = await axios.post(url, authData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { idToken, localId, expiresIn } = await res.data;

      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      localStorage.setItem('token', idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', localId);

      dispatch(authSuccess(idToken, localId));
      dispatch(checkTimeoutAuth(expiresIn));
    } catch (error) {
      dispatch(authFail(error.response.data.error));
    }
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');

    if (token) {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(
          checkTimeoutAuth(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(logout());
      }
    } else {
      dispatch(logout());
    }
  };
};
