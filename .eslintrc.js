module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': ['warn', 'never'],
    'vue/no-unused-vars': ['warn'],
    eqeqeq: 'off',
    'space-in-parens': 'off',
    'no-unused-vars': 'warn',
    'no-undef': 'warn',
    camelcase: 'warn',
    'no-unreachable': 'warn',
    'vue/no-parsing-error': 'warn'
  }
}
