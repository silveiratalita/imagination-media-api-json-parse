module.exports = {
  env: {
    es6: true,
    node: true,
    jasmine: true
  },
  extends: [
    'prettier',
    'eslint:recommended',
    'google'
  ],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    semi: [2, 'always'],
    'space-before-function-paren': [2, 'never'],
    'require-atomic-updates': 'off'
  },
};