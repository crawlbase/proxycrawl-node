module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
  },
  rules: {
    'no-useless-escape': 0,
    'no-console': 0,
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
  },
  globals: {},
};
