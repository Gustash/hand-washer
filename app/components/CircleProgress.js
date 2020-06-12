import React from 'react'
import { StyleSheet } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import Animated from 'react-native-reanimated'
import { colors } from 'app/config'

const { interpolate, multiply } = Animated
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const CircleProgress = ({ size, strokeWidth, progress }) => {
  const r = (size - strokeWidth) / 2
  const cx = size / 2
  const cy = size / 2
  const circumference = r * 2 * Math.PI

  // The current angle of the circle based on the progress.
  const angle = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [Math.PI * 2, 0],
  })
  const strokeDashoffset = multiply(angle, r)

  return (
    <Svg width={size} height={size} style={styles.container}>
      <AnimatedCircle
        stroke={colors.green}
        fill="none"
        strokeDasharray={`${circumference}, ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        strokeWidth={strokeWidth}
        cx={cx}
        cy={cy}
        r={r}
        strokeLinecap="round"
      />
    </Svg>
  )
}

const styles = StyleSheet.create({
  container: {
    transform: [{ rotateZ: '270deg' }],
  },
})

export default CircleProgress
