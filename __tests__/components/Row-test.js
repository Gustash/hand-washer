import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import Row from '../../app/components/Row'
import { findNodeWithTestId } from '../../testHelpers'

const mockProps = props => ({
  highlight: 'Highlight',
  highlightStyle: { marginTop: 1000 },
  primaryText: 'Primary Text',
  secondaryText: 'Secondary Text',
  style: { marginBottom: 1000 },
  ...props,
})

describe('<Row />', () => {
  let props
  let wrapper

  beforeEach(() => {
    props = mockProps()
    wrapper = shallow(<Row {...props} />)
  })

  it('matches snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('applies highlight text', () => {
    expect(
      findNodeWithTestId(wrapper, 'row-highlight-text').prop('children')
    ).toBe('Highlight')

    wrapper.setProps({
      ...props,
      highlight: 'Highlight 2',
    })

    expect(
      findNodeWithTestId(wrapper, 'row-highlight-text').prop('children')
    ).toBe('Highlight 2')
  })

  it('applies primary text', () => {
    expect(
      findNodeWithTestId(wrapper, 'row-primary-text').prop('children')
    ).toBe('Primary Text')

    wrapper.setProps({
      ...props,
      primaryText: 'Another Primary',
    })

    expect(
      findNodeWithTestId(wrapper, 'row-primary-text').prop('children')
    ).toBe('Another Primary')
  })

  it('applies secondary text', () => {
    expect(
      findNodeWithTestId(wrapper, 'row-secondary-text').prop('children')
    ).toBe('Secondary Text')

    wrapper.setProps({
      ...props,
      secondaryText: 'Another Secondary',
    })

    expect(
      findNodeWithTestId(wrapper, 'row-secondary-text').prop('children')
    ).toBe('Another Secondary')
  })

  it('applies highlight style', () => {
    expect(
      findNodeWithTestId(wrapper, 'row-highlight-container').prop('style')
    ).toContainEqual({
      marginTop: 1000,
    })

    wrapper.setProps({
      ...props,
      highlightStyle: {
        marginTop: 3000,
      },
    })

    expect(
      findNodeWithTestId(wrapper, 'row-highlight-container').prop('style')
    ).toContainEqual({
      marginTop: 3000,
    })
  })

  it('applies style', () => {
    expect(wrapper.first().prop('style')).toContainEqual({
      marginBottom: 1000,
    })

    wrapper.setProps({
      ...props,
      style: {
        marginBottom: 3000,
      },
    })

    expect(wrapper.first().prop('style')).toContainEqual({
      marginBottom: 3000,
    })
  })

  it('defaults separator to false', () => {
    expect(wrapper.first().prop('style')).toContain(false)
  })

  it('applies separator', () => {
    wrapper.setProps({
      ...props,
      separator: false,
    })

    expect(wrapper.first().prop('style')).not.toContainEqual({
      borderBottomColor: '#E6E6E6',
      borderBottomWidth: 1,
    })

    wrapper.setProps({
      ...props,
      separator: true,
    })

    expect(wrapper.first().prop('style')).toContainEqual({
      borderBottomColor: '#E6E6E6',
      borderBottomWidth: 1,
    })
  })
})
