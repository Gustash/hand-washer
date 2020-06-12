import local from './local'
import development from './development'
import production from './production'
import colors from './colors'
import store from './store'

let config = {
  colors,
  storybookEnabled: false,
}

if (__DEV__) {
  config = {
    ...config,
    ...development,
    ...local,
    ...store,
  }
} else {
  config = {
    ...config,
    ...local,
    ...production,
    ...store,
  }
}

export { colors }
export default config
