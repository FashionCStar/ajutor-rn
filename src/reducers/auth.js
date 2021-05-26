import { AUTH_SIGNOUT, SET_PHONENUMBER, SET_USERDATA, SET_TOKEN, SET_USERNAME } from "../actions/types";
import { createReducer } from "../utils";

const initialState = {
  userData: null,
  token: ""
};

const authReducer = createReducer(initialState, {
  [SET_USERDATA]: (state, { payload: userData }) => ({ ...state, userData }),
  [SET_TOKEN]: (state, { payload: token }) => ({ ...state, token }),
  [SET_USERNAME]: (state, { payload: userName }) => ({ ...state, userData: { ...state.userData, userName } }),
  [SET_PHONENUMBER]: (state, { payload: phoneNumber }) => ({ ...state, userData: { ...state.userData, phoneNumber, isPhoneVerified: true } }),
  [AUTH_SIGNOUT]: (state) => ({ ...initialState })
});

export default authReducer;