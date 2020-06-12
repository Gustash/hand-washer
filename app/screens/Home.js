import React, { useLayoutEffect } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import { colors } from 'app/config'
import { actions } from 'app/state'
import InfoBox from 'app/components/InfoBox'
import CircularButton from 'app/components/CircularButton'
import HandsWashIcon from 'app/components/HandsWashIcon'
import BottomBarButton from 'app/components/BottomBarButton'
import LogCard from 'app/components/LogCard'
import { useScheduledNotification } from 'app/hooks/notifications'

const Home = ({ navigation }) => {
  useScheduledNotification(() => {
    navigation.navigate('Timer')
  })

  const dispatch = useDispatch()
  const shiftActive = useSelector(state => state.shifts.shiftActive)
  const shiftReminders = useSelector(state => state.shifts.shiftReminders)
  const washes = useSelector(state => state.history.washes)

  const sortedWashes = [...washes].sort((a, b) =>
    moment(b.date, 'DD-MM-YYYY HH:mm').diff(moment(a.date, 'DD-MM-YYYY HH:mm'))
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Settings')
          }}
        >
          <FontAwesome5 name="cog" size={21} color={colors.white} />
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatList}
        ListHeaderComponent={
          <>
            <InfoBox
              text={`Currently on shift ${
                shiftReminders
                  ? 'and receiving reminders'
                  : 'with reminders disabled'
              }`}
              style={styles.infoBox}
              hidden={!shiftActive}
            />
            <CircularButton
              text="Wash"
              icon={<HandsWashIcon color={colors.white} size={68} />}
              style={styles.circularButton}
              onPress={() => {
                navigation.navigate('Timer')
              }}
            />
            {washes.length > 0 && (
              <Text testId="home-history-subheader" style={styles.subHeader}>
                HISTORY
              </Text>
            )}
          </>
        }
        data={sortedWashes}
        keyExtractor={({ id }) => `log_${id}`}
        renderItem={({ item }) => (
          <LogCard style={styles.card} date={item.date} />
        )}
      />
      <BottomBarButton
        text={`${shiftActive ? 'End' : 'Start'} Shift`}
        color={shiftActive ? colors.lightBlue : colors.green}
        onPress={() => {
          dispatch(actions.setShiftActive(!shiftActive))
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flexGrow: 1,
  },
  infoBox: {
    marginTop: 28,
    marginHorizontal: 24,
  },
  circularButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
  card: {
    marginLeft: 16,
  },
  subHeader: {
    fontSize: 14,
    color: colors.darkGrey,
    marginVertical: 28,
    marginHorizontal: 32,
  },
})

export default Home
