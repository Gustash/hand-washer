import React from 'react'
import { TouchableOpacity, StyleSheet, Text, SafeAreaView } from 'react-native'
import { colors } from 'app/config'

const BottomBarButton = ({
  onPress,
  text,
  style,
  color = colors.lightBlue,
  textColor = colors.white,
}) => (
  <TouchableOpacity onPress={onPress}>
    <SafeAreaView style={[styles.container, { backgroundColor: color }, style]}>
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </SafeAreaView>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowOffset: {
      height: -4,
    },
    shadowRadius: 16,
  },
  text: {
    fontSize: 17,
    textAlign: 'center',
    marginVertical: 16,
  },
})

export default BottomBarButton
