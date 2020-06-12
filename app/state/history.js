import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

const initialState = {
  storeWashes: true,
  washes: [],
}

export default createSlice({
  name: 'history',
  initialState,
  reducers: {
    logWash(state, action) {
      if (!state.storeWashes) {
        return {
          ...state,
          washes: [],
        }
      }

      const { format = 'DD-MM-YYYY HH:mm', date, ...entry } = action.payload
      const momentDate = moment(date, format)

      if (!momentDate.isValid()) {
        return state
      }

      // Get the biggest existing id and increment it to create a new unique one
      const newId = Math.max(0, ...state.washes.map(({ id }) => id)) + 1

      return {
        ...state,
        washes: [
          ...state.washes,
          {
            ...entry,
            id: newId,
            date: momentDate.format('DD-MM-YYYY HH:mm'),
          },
        ],
      }
    },
    setStoreWashes(state, action) {
      return {
        ...state,
        storeWashes: action.payload,
        washes: action.payload ? state.washes : [],
      }
    },
  },
})
