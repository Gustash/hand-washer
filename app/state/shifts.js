import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shiftReminders: true,
  shiftActive: false,
}

export default createSlice({
  name: 'shifts',
  initialState,
  reducers: {
    setShiftReminders(state, action) {
      return {
        ...state,
        shiftReminders: action.payload,
      }
    },
    setShiftActive(state, action) {
      return {
        ...state,
        shiftActive: action.payload,
      }
    },
  },
})
