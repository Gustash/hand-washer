import storeConfig from '../../app/config/store'

describe('store config', () => {
  it('should create store', () => {
    const { store, persistor } = storeConfig.createStore()

    expect(store).toMatchObject({
      dispatch: expect.any(Function),
      subscribe: expect.any(Function),
      getState: expect.any(Function),
      replaceReducer: expect.any(Function),
    })
    expect(persistor).toMatchObject({
      dispatch: expect.any(Function),
      subscribe: expect.any(Function),
      getState: expect.any(Function),
      replaceReducer: expect.any(Function),
      purge: expect.any(Function),
      flush: expect.any(Function),
      pause: expect.any(Function),
      persist: expect.any(Function),
    })
  })
})
