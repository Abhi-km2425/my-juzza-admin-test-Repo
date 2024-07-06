import AuthSlicer from './slices/AuthSlicer';
import TokenReducer from './slices/TokenReducer';
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from "redux-persist"

const rootReducer = combineReducers({
    auth: AuthSlicer,
    token: TokenReducer,
  })

  const persistConfig = {
    key: 'root',
    storage
  }
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  
  export const store = configureStore({
    reducer: persistedReducer
  });
  
  export const persistor = persistStore(store)
