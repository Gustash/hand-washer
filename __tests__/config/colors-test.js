import colors from '../../app/config/colors'

describe('colors config', () => {
  it('matches snapshot', () => {
    expect(JSON.stringify(colors)).toMatchSnapshot()
  })
})
