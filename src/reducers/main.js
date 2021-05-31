import { SET_LANGUAGE } from "../actions/types";
import { createReducer } from "../utils";

const initialState = {
  language: "English",
};

const mainReducer = createReducer(initialState, {
  [SET_LANGUAGE]: (state, { payload: language }) => ({ ...state, language }),
});

export default mainReducer;