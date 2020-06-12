module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:prettier/recommended'],
  globals: {
    recordSaga: true,
    Intl: true,
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
      },
    },
  ],
}
