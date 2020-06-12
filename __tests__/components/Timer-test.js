import React from 'react'
import { Text } from 'react-native'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useCode, call, clockRunning } from 'react-native-reanimated'

import Timer from '../../app/components/Timer'
import CircularButton from '../../app/components/CircularButton'
import { findNodeWithTestId } from '../../testHelpers'

const mockProps = props => ({
  duration: 20000,
  style: { marginTop: 1000 },
  onTimerFinished: jest.fn(),
  ...props,
})

describe('<Timer />', () => {
  let props
  let wrapper

  beforeEach(() => {
    useCode.mockReset()

    props = mockProps()
    wrapper = shallow(<Timer {...props} />)
  })

  it('matches snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('initializes bottom text', () => {
    expect(
      wrapper.containsMatchingElement(<CircularButton text="Seconds" />)
    ).toBe(true)
  })

  it('initializes second count text', () => {
    const Icon = () =>
      findNodeWithTestId(wrapper, 'timer-circular-button').prop('icon')
    let icon = shallow(<Icon />)

    expect(icon).toMatchElement(
      <Text
        style={{
          fontSize: 48,
          color: '#FFFFFF',
        }}
      >
        20
      </Text>
    )
  })

  it('defaults stroke width', () => {
    expect(
      findNodeWithTestId(wrapper, 'timer-circle-progress').prop('strokeWidth')
    ).toBe(9)
  })

  it('defaults size', () => {
    expect(
      findNodeWithTestId(wrapper, 'timer-circle-progress').prop('size')
    ).toBe(222)
  })

  it('applies stroke width', () => {
    wrapper.setProps({
      ...props,
      strokeWidth: 16,
    })

    expect(
      findNodeWithTestId(wrapper, 'timer-circle-progress').prop('strokeWidth')
    ).toBe(16)
  })

  it('applies size', () => {
    wrapper.setProps({
      ...props,
      size: 16,
    })

    expect(
      findNodeWithTestId(wrapper, 'timer-circle-progress').prop('size')
    ).toBe(16)
  })

  it('applies style', () => {
    expect(wrapper.first().prop('style')).toEqual({ marginTop: 1000 })

    wrapper.setProps({
      ...props,
      style: { marginBottom: 1000 },
    })

    expect(wrapper.first().prop('style')).toEqual({ marginBottom: 1000 })
  })

  it('calls useCode', () => {
    expect(useCode).toHaveBeenCalled()
  })

  it('sets current progress', () => {
    useCode.mockImplementationOnce(a => a())
    call.mockImplementationOnce((a, b) => b([1, 0]))
    call.mockImplementationOnce((a, b) => b(2000))
    clockRunning.mockReturnValue(true)

    wrapper = shallow(<Timer {...props} />)

    const Icon = () =>
      findNodeWithTestId(wrapper, 'timer-circular-button').prop('icon')
    let icon = shallow(<Icon />)

    expect(icon).toMatchElement(
      <Text
        style={{
          fontSize: 48,
          color: '#FFFFFF',
        }}
      >
        18
      </Text>
    )
  })

  it('keeps current progress when clock not running', () => {
    useCode.mockImplementationOnce(a => a())
    call.mockImplementationOnce((a, b) => b([0, 1]))
    call.mockImplementationOnce((a, b) => b(21000))
    clockRunning.mockReturnValue(false)

    wrapper = shallow(<Timer {...props} />)

    const Icon = () =>
      findNodeWithTestId(wrapper, 'timer-circular-button').prop('icon')
    let icon = shallow(<Icon />)

    expect(icon).toMatchElement(
      <Text
        style={{
          fontSize: 48,
          color: '#FFFFFF',
        }}
      >
        20
      </Text>
    )
  })

  it('sets timer finished', () => {
    useCode.mockImplementationOnce(a => a())
    call.mockImplementationOnce((a, b) => b([1, 1]))

    wrapper = shallow(<Timer {...props} />)

    const Icon = () =>
      findNodeWithTestId(wrapper, 'timer-circular-button').prop('icon')
    const icon = shallow(<Icon />)

    expect(
      icon.containsMatchingElement(
        <FontAwesome5 name="thumbs-up" size={48} color="#FFFFFF" solid />
      )
    ).toBe(true)

    expect(
      wrapper.containsMatchingElement(<CircularButton text="Well Done" />)
    ).toBe(true)
  })

  it('calls onTimerFinished when animation ends', () => {
    useCode.mockImplementationOnce(a => a())
    call.mockImplementationOnce((a, b) => b([0, 0]))

    shallow(<Timer {...props} />)

    useCode.mockImplementationOnce(a => a())
    call.mockImplementationOnce((a, b) => b([0, 1]))

    shallow(<Timer {...props} />)

    useCode.mockImplementationOnce(a => a())
    call.mockImplementationOnce((a, b) => b([1, 0]))

    shallow(<Timer {...props} />)

    expect(props.onTimerFinished).not.toHaveBeenCalled()

    useCode.mockImplementationOnce(a => a())
    call.mockImplementationOnce((a, b) => b([1, 1]))

    shallow(<Timer {...props} />)

    expect(props.onTimerFinished).toHaveBeenCalledTimes(1)
  })

  it('positions circular button properly regardless of stroke width', () => {
    expect(
      findNodeWithTestId(wrapper, 'timer-circular-button').prop('style')
    ).toContainEqual({
      top: 9,
      left: 9,
    })
    expect(
      findNodeWithTestId(wrapper, 'timer-circular-button').prop('size')
    ).toBe(204)

    wrapper.setProps({
      ...props,
      size: 400,
      strokeWidth: 100,
    })

    expect(
      findNodeWithTestId(wrapper, 'timer-circular-button').prop('style')
    ).toContainEqual({
      top: 100,
      left: 100,
    })
    expect(
      findNodeWithTestId(wrapper, 'timer-circular-button').prop('size')
    ).toBe(200)
  })
})
