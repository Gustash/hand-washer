import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import { combineReducers } from '@reduxjs/toolkit'
import { reducers } from './slices'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const rootReducer = combineReducers(reducers)

export default persistReducer(persistConfig, rootReducer)
