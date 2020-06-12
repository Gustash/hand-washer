import historySlice from '../../app/state/history'

const { actions, reducer } = historySlice

describe('history slice', () => {
  describe('actions', () => {
    it('should create a log wash action', () => {
      const wash = { date: '01-01-1990 00:00' }
      const expectedAction = {
        type: 'history/logWash',
        payload: {
          date: '01-01-1990 00:00',
        },
      }

      expect(actions.logWash(wash)).toEqual(expectedAction)
    })

    it('should create a set store washes action', () => {
      const expectedAction = {
        type: 'history/setStoreWashes',
        payload: true,
      }

      expect(actions.setStoreWashes(true)).toEqual(expectedAction)
    })
  })

  describe('reducer', () => {
    it('should initialize state', () => {
      expect(reducer(undefined, {})).toEqual({
        storeWashes: true,
        washes: [],
      })
    })

    it('should handle log wash', () => {
      expect(
        reducer(
          {
            storeWashes: true,
            washes: [],
          },
          {
            type: 'history/logWash',
            payload: {
              date: '01-01-1990 00:00',
            },
          }
        )
      ).toEqual({
        storeWashes: true,
        washes: [
          {
            id: 1,
            date: '01-01-1990 00:00',
          },
        ],
      })

      expect(
        reducer(
          {
            storeWashes: true,
            washes: [
              { id: 2, date: '01-01-1990 01:00' },
              { id: 4, date: '02-01-1990 01:00' },
            ],
          },
          {
            type: 'history/logWash',
            payload: {
              date: '03-01-1990 01:00',
            },
          }
        )
      ).toEqual({
        storeWashes: true,
        washes: [
          {
            id: 2,
            date: '01-01-1990 01:00',
          },
          {
            id: 4,
            date: '02-01-1990 01:00',
          },
          {
            id: 5,
            date: '03-01-1990 01:00',
          },
        ],
      })
    })
  })

  it('should reject invalid dates when logging', () => {
    expect(
      reducer(
        {
          storeWashes: true,
          washes: [],
        },
        {
          type: 'history/logWash',
          payload: {
            date: 'not a date',
          },
        }
      )
    ).toEqual({
      storeWashes: true,
      washes: [],
    })
  })

  it('should accept a date format for a log', () => {
    expect(
      reducer(
        {
          storeWashes: true,
          washes: [],
        },
        {
          type: 'history/logWash',
          payload: {
            date: '2007/13/12 12:13',
            format: 'YYYY/DD/MM HH:mm',
          },
        }
      )
    ).toEqual({
      storeWashes: true,
      washes: [{ id: 1, date: '13-12-2007 12:13' }],
    })
  })

  it('should not save a wash when storeWashes is false', () => {
    expect(
      reducer(
        {
          storeWashes: false,
          washes: [],
        },
        {
          type: 'history/logWash',
          payload: {
            date: '01-01-1990 00:00',
          },
        }
      )
    ).toEqual({
      storeWashes: false,
      washes: [],
    })

    expect(
      reducer(
        {
          storeWashes: false,
          washes: [
            { id: 2, date: '01-01-1990 01:00' },
            { id: 4, date: '02-01-1990 01:00' },
          ],
        },
        {
          type: 'history/logWash',
          payload: {
            date: '03-01-1990 01:00',
          },
        }
      )
    ).toEqual({
      storeWashes: false,
      washes: [],
    })
  })

  it('should enable store washes', () => {
    expect(
      reducer(
        { storeWashes: false, washes: [{ id: 1, date: '01-01-1990 HH:mm' }] },
        {
          type: 'history/setStoreWashes',
          payload: true,
        }
      )
    ).toEqual({
      storeWashes: true,
      washes: [{ id: 1, date: '01-01-1990 HH:mm' }],
    })
  })

  it('should disable store washes and clear washes', () => {
    expect(
      reducer(
        { storeWashes: true, washes: [{ id: 1, date: '01-01-1990 HH:mm' }] },
        {
          type: 'history/setStoreWashes',
          payload: false,
        }
      )
    ).toEqual({
      storeWashes: false,
      washes: [],
    })
  })
})
