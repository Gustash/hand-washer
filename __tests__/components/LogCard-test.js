import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import LogCard from '../../app/components/LogCard'
import Row from '../../app/components/Row'

const mockProps = props => ({
  date: '01-01-1990 00:00',
  ...props,
})

const matchesDate = (wrapper, highlight, primaryText, secondaryText) => {
  expect(wrapper.find(Row).props()).toMatchObject({
    highlight,
    primaryText,
    secondaryText,
  })
}

describe('<LogCard />', () => {
  let props
  let wrapper

  beforeEach(() => {
    props = mockProps()
    wrapper = shallow(<LogCard {...props} />)
  })

  it('matches snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('applies date', () => {
    matchesDate(wrapper, '00:00', 'Monday', '1st January 1990')
    wrapper.setProps({
      ...props,
      date: '02-01-1990 01:10',
    })
    matchesDate(wrapper, '01:10', 'Tuesday', '2nd January 1990')
    wrapper.setProps({
      ...props,
      date: '03-01-1990 02:20',
    })
    matchesDate(wrapper, '02:20', 'Wednesday', '3rd January 1990')
    wrapper.setProps({
      ...props,
      date: '04-01-1990 03:30',
    })
    matchesDate(wrapper, '03:30', 'Thursday', '4th January 1990')
    wrapper.setProps({
      ...props,
      date: '05-01-1990 04:40',
    })
    matchesDate(wrapper, '04:40', 'Friday', '5th January 1990')
    wrapper.setProps({
      ...props,
      date: '06-01-1990 05:50',
    })
    matchesDate(wrapper, '05:50', 'Saturday', '6th January 1990')
    wrapper.setProps({
      ...props,
      date: '07-01-1990 06:13',
    })
    matchesDate(wrapper, '06:13', 'Sunday', '7th January 1990')
    wrapper.setProps({
      ...props,
      date: 'Invalid date',
    })
    matchesDate(wrapper, 'Invalid date', '', 'Invalid date')
  })

  it('uses format', () => {
    wrapper.setProps({
      ...props,
      date: '1990/02/01 01:02:13',
      format: 'YYYY/DD/MM HH:mm:ss',
    })
    matchesDate(wrapper, '01:02', 'Tuesday', '2nd January 1990')
  })

  it('spreads props', () => {
    wrapper.setProps({
      ...props,
      style: {
        marginTop: 1000,
      },
    })
    expect(wrapper.find(Row).props()).toMatchObject({
      style: {
        marginTop: 1000,
      },
    })
  })
})
