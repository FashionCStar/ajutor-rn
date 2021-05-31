import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistCombineReducers} from 'redux-persist';
// import AsyncStorage from '@react-native-community/async-storage';

import auth from './auth';
import state from './state';
import main from './main';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: null,
  whitelist: ['auth'],
};

export default persistCombineReducers(persistConfig, {
  auth,
  state,
  main
});
