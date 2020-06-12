import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from 'app/config'

const InfoBox = ({ text, style, hidden = false }) => (
  <View style={[styles.container, { opacity: hidden ? 0 : 1 }, style]}>
    <Text style={styles.text}>{text}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    paddingHorizontal: 22,
    paddingVertical: 6,
    borderRadius: 4,
  },
  text: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 17,
  },
})

export default InfoBox
