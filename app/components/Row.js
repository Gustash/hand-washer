import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from 'app/config'

const Row = ({
  highlight,
  highlightStyle,
  primaryText,
  secondaryText,
  style,
  separator = false,
}) => (
  <View style={[styles.container, separator && styles.separator, style]}>
    <View
      testId="row-highlight-container"
      style={[styles.highlightContainer, highlightStyle]}
    >
      <Text testId="row-highlight-text" style={styles.highlightText}>
        {highlight}
      </Text>
    </View>
    <View style={styles.textContainer}>
      <Text testId="row-primary-text" style={styles.primaryText}>
        {primaryText}
      </Text>
      <Text testId="row-secondary-text" style={styles.secondaryText}>
        {secondaryText}
      </Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  separator: {
    borderBottomColor: colors.separator,
    borderBottomWidth: 1,
  },
  highlightContainer: {
    backgroundColor: colors.green,
    paddingHorizontal: 14,
    paddingVertical: 8,
    width: 80,
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  highlightText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 17,
  },
  primaryText: {
    fontSize: 17,
    color: colors.darkGrey,
  },
  textContainer: {
    flex: 1,
  },
  secondaryText: {
    fontSize: 14,
    color: colors.lightGrey,
  },
})

export default Row
