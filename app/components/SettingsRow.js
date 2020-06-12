import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { colors } from 'app/config'

const SettingsRow = ({ text, rightElement, style, onPress }) => (
  <TouchableOpacity
    style={[styles.container, style]}
    onPress={onPress}
    disabled={!onPress}
  >
    <Text testId="settings-row-text" style={styles.text}>
      {text}
    </Text>
    {rightElement}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: colors.separator,
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingLeft: 8,
    paddingRight: 27,
    alignItems: 'center',
  },
  text: {
    color: colors.darkGrey,
    fontSize: 17,
    flex: 1,
  },
})

export default SettingsRow
