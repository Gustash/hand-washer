import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import moment from 'moment'
import { useDispatch } from 'react-redux'

import Row from 'app/components/Row'
import Timer from 'app/components/Timer'
import { actions } from 'app/state'
import { colors } from 'app/config'

const WashTimer = () => {
  const dispatch = useDispatch()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Timer
        testId="wash-timer-timer"
        duration={20 * 1000}
        style={styles.timer}
        onTimerFinished={() => {
          dispatch(
            actions.logWash({ date: moment().format('DD-MM-YYYY HH:mm') })
          )
        }}
      />
      <Row
        primaryText="Wet your hands"
        secondaryText="With clean, running water (warm or cold), turn off the tap, and apply soap"
        highlight="1"
        highlightStyle={styles.highlightStyle}
        style={styles.row}
      />
      <Row
        primaryText="Lather your hands"
        secondaryText="Rub them together with soap. Lather the backs of your hands, between your fingers, and under your nails"
        highlight="2"
        highlightStyle={styles.highlightStyle}
        style={styles.row}
      />
      <Row
        primaryText="Scrub"
        secondaryText="Scrub your hands for at least 20 seconds"
        highlight="3"
        highlightStyle={styles.highlightStyle}
        style={styles.row}
      />
      <Row
        primaryText="Rinse well"
        secondaryText="Using running clean water"
        highlight="4"
        highlightStyle={styles.highlightStyle}
        style={styles.row}
      />
      <Row
        primaryText="Dry your hands"
        secondaryText="Using a clean towel or air dry them"
        highlight="5"
        highlightStyle={styles.highlightStyle}
        style={styles.row}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 48,
    color: colors.white,
  },
  timer: {
    marginVertical: 80,
  },
  highlightStyle: {
    width: 38,
    height: 36,
  },
  row: {
    marginRight: 65,
    marginLeft: 30,
    paddingVertical: 0,
    marginTop: 16,
  },
})

export default WashTimer
