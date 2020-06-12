import 'react-native-gesture-handler'
import React from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import Home from './screens/Home'
import WashTimer from './screens/WashTimer'
import Settings from './screens/Settings'
import config, { colors } from './config'

const Stack = createStackNavigator()

const { store, persistor } = config.createStore()

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <StatusBar backgroundColor={colors.green} />
        <Stack.Navigator
          screenOptions={{
            headerStyle: styles.header,
            headerBackImage: () => (
              <FontAwesome5
                name="chevron-left"
                size={16}
                color={colors.white}
                style={styles.headerBackIcon}
              />
            ),
            headerTitleStyle: styles.headerTitle,
            headerRightContainerStyle: styles.headerRightIcon,
            headerBackTitle: 'Back',
            headerBackTitleStyle: [styles.headerTitle, styles.headerBackTitle],
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Wash Timer' }}
          />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Timer" component={WashTimer} />
        </Stack.Navigator>
      </NavigationContainer>
    </PersistGate>
  </Provider>
)

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.green,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 17,
  },
  headerRightIcon: {
    marginRight: 16,
  },
  headerBackTitle: {
    fontSize: 16,
  },
  headerBackIcon: {
    marginLeft: 16,
    marginRight: 4,
  },
})

export default App
