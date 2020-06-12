import React from 'react'
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import { colors } from 'app/config'

export const DEFAULT_CIRCULAR_BUTTON_SIZE = 204

const CircularButton = ({
  size = DEFAULT_CIRCULAR_BUTTON_SIZE,
  onPress,
  text,
  icon,
  style,
}) => (
  <TouchableOpacity
    style={[
      styles.container,
      { width: size, height: size, borderRadius: size / 2 },
      style,
    ]}
    onPress={onPress}
    disabled={!onPress}
  >
    <View style={styles.icon}>{icon}</View>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightBlue,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 2,
    },
    shadowRadius: 16,
    padding: 30,

    elevation: 16,
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 21,
  },
})

export default CircularButton
