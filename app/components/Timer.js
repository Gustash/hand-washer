import React, { useState, useRef, useEffect } from 'react'
import Animated, {
  Easing,
  useCode,
  call,
  stopClock,
  timing,
  startClock,
  cond,
  clockRunning,
  and,
  not,
} from 'react-native-reanimated'
import { StyleSheet, Text, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import CircularButton, { DEFAULT_CIRCULAR_BUTTON_SIZE } from './CircularButton'
import CircleProgress from './CircleProgress'
import { colors } from 'app/config'

const { Value, Clock } = Animated

const Timer = ({
  duration,
  strokeWidth = 9,
  size = DEFAULT_CIRCULAR_BUTTON_SIZE + strokeWidth * 2,
  style,
  onTimerFinished,
}) => {
  const [currentProgress, setCurrentProgress] = useState(duration / 1000)
  const [timerFinished, setTimerFinished] = useState(false)

  const clock = useRef(new Clock()).current
  const progress = useRef(new Value(0)).current
  const finished = useRef(new Value(0)).current
  const frameTime = useRef(new Value(0)).current
  const time = useRef(new Value(0)).current

  useCode(() => {
    const clockIsRunning = clockRunning(clock)

    return [
      timing(
        clock,
        { finished, position: progress, frameTime, time },
        { toValue: 1, duration, easing: Easing.linear }
      ),
      cond(and(finished, clockIsRunning), stopClock(clock)),
      cond(and(not(finished), not(clockIsRunning)), startClock(clock)),
      call([clockIsRunning, finished], ([running, clockFinished]) => {
        if (clockFinished && running) {
          setTimerFinished(true)
        }
      }),
      call([frameTime], value => {
        if (clockIsRunning) {
          setCurrentProgress(Math.round((duration - value) / 1000))
        }
      }),
    ]
  }, [progress, duration, clock, finished, frameTime, time, onTimerFinished])

  useEffect(() => {
    if (timerFinished) {
      onTimerFinished?.()
    }
  }, [timerFinished, onTimerFinished])

  // noinspection JSSuspiciousNameCombination
  return (
    <View style={style}>
      <CircleProgress
        testId="timer-circle-progress"
        size={size}
        progress={progress}
        strokeWidth={strokeWidth}
      />
      <CircularButton
        testId="timer-circular-button"
        icon={
          timerFinished ? (
            <FontAwesome5
              name="thumbs-up"
              size={48}
              color={colors.white}
              solid
            />
          ) : (
            <Text style={styles.timerText}>{currentProgress}</Text>
          )
        }
        text={timerFinished ? 'Well Done' : 'Seconds'}
        style={[
          styles.timer,
          {
            top: strokeWidth,
            left: strokeWidth,
          },
        ]}
        size={size - strokeWidth * 2}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  timerText: {
    fontSize: 48,
    color: colors.white,
  },
  timer: {
    position: 'absolute',
  },
})

export default Timer
