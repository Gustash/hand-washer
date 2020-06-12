import historySlice from './history'
import shiftsSlice from './shifts'

const reducers = {
  history: historySlice.reducer,
  shifts: shiftsSlice.reducer,
}

const actions = {
  ...historySlice.actions,
  ...shiftsSlice.actions,
}

export { reducers, actions }
