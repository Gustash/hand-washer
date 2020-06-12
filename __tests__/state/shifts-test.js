import shiftsSlice from '../../app/state/shifts'

const { actions, reducer } = shiftsSlice

describe('shifts slice', () => {
  describe('actions', () => {
    it('should create a set shift reminders action', () => {
      const expectedAction = {
        type: 'shifts/setShiftReminders',
        payload: true,
      }

      expect(actions.setShiftReminders(true)).toEqual(expectedAction)
    })

    it('should create a set shift active action', () => {
      const expectedAction = {
        type: 'shifts/setShiftActive',
        payload: true,
      }

      expect(actions.setShiftActive(true)).toEqual(expectedAction)
    })
  })

  describe('reducer', () => {
    it('should initialize state', () => {
      expect(reducer(undefined, {})).toEqual({
        shiftReminders: true,
        shiftActive: false,
      })
    })

    it('should handle setting shift reminders', () => {
      expect(
        reducer(
          {
            shiftReminders: true,
            shiftActive: false,
          },
          {
            type: 'shifts/setShiftReminders',
            payload: false,
          }
        )
      ).toEqual({
        shiftReminders: false,
        shiftActive: false,
      })

      expect(
        reducer(
          {
            shiftReminders: false,
            shiftActive: false,
          },
          {
            type: 'shifts/setShiftReminders',
            payload: true,
          }
        )
      ).toEqual({
        shiftReminders: true,
        shiftActive: false,
      })
    })

    it('should handle setting shift active', () => {
      expect(
        reducer(
          {
            shiftReminders: true,
            shiftActive: false,
          },
          {
            type: 'shifts/setShiftActive',
            payload: true,
          }
        )
      ).toEqual({
        shiftReminders: true,
        shiftActive: true,
      })

      expect(
        reducer(
          {
            shiftReminders: false,
            shiftActive: true,
          },
          {
            type: 'shifts/setShiftActive',
            payload: false,
          }
        )
      ).toEqual({
        shiftReminders: false,
        shiftActive: false,
      })
    })
  })
})
