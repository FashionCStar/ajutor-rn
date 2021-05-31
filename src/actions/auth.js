import { Toast } from "native-base";
import { sendPostRequest, sendGetRequest } from "../utils/api";
import { HIDE_PROGRESS, SHOW_PROGRESS, SET_USERDATA, SET_TOKEN, AUTH_SIGNOUT } from "./types";

export function signUp(params) {
  return async (dispatch) => {
    try {
      const { email, phone, password, first_name, last_name, country, state, city } = params;
      dispatch({ type: SHOW_PROGRESS });
      const { data: userData, token: token } = await sendPostRequest('/auth/register', { email, phone, password, first_name, last_name, country, state, city });
      dispatch({ type: HIDE_PROGRESS });
      dispatch({ type: SET_USERDATA, payload: userData });
      dispatch({ type: SET_TOKEN, payload: token });

    } catch (error) {
      console.log('signup111 error', error);
      return dispatch({ type: HIDE_PROGRESS });
    }
  };
}

export function signOut() {
  return async (dispatch) => {
    return dispatch({type: AUTH_SIGNOUT});
  };
}

export function signIn(params) {
  return async (dispatch) => {
    try {
      dispatch({ type: SHOW_PROGRESS });
      const { email, password } = params;
      const { data: userData, token: token } = await sendPostRequest('/auth/login', { email, password });
      // Toast.show({ text: `Welcome to ${APP_NAME}`, type: 'success', duration: 2000, position: 'top' });
      dispatch({ type: HIDE_PROGRESS });
      dispatch({ type: SET_USERDATA, payload: userData });
      dispatch({ type: SET_TOKEN, payload: token });
    } catch (error) {
      console.log('Sign In error', error);
      Toast.show({ text: error.message, type: 'warning', duration: 3000 });
      return dispatch({ type: HIDE_PROGRESS });
    }
  };
}

export function forgotPassword(params, callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: SHOW_PROGRESS });
      const { email } = params;
      const { resetcode: resetcode } = await sendPostRequest('/auth/forgot-password', { email });
      console.log('resetcode', resetcode);
      // Toast.show({ text: `Welcome to ${APP_NAME}`, type: 'success', duration: 2000, position: 'top' });
      dispatch({ type: HIDE_PROGRESS });
      // dispatch({ type: SET_TOKEN, payload: token });
      callback();
    } catch (error) {
      console.log('Sign In error', error);
      Toast.show({ text: error.message, type: 'warning', duration: 3000 });
      return dispatch({ type: HIDE_PROGRESS });
    }
  };
}

export function resetPassword(params, callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: SHOW_PROGRESS });
      const { email, email_code, newpassword } = params;
      const { result } = await sendPostRequest('/auth/reset-password', { email, email_code, newpassword });
      console.log('resultttttttt', result);
      // Toast.show({ text: `Welcome to ${APP_NAME}`, type: 'success', duration: 2000, position: 'top' });
      dispatch({ type: HIDE_PROGRESS });
      // dispatch({ type: SET_TOKEN, payload: token });
      callback();
    } catch (error) {
      console.log('Sign In error', error);
      Toast.show({ text: error.message, type: 'warning', duration: 3000 });
      return dispatch({ type: HIDE_PROGRESS });
    }
  };
}
