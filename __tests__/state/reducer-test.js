import { rootReducer } from '../../app/state'

describe('root reducer', () => {
  it('should initialize state', () => {
    expect(rootReducer(undefined, {})).toEqual({
      history: {
        storeWashes: true,
        washes: [],
      },
      shifts: {
        shiftReminders: true,
        shiftActive: false,
      },
    })
  })
})
