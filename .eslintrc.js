module.exports = {
  env: {
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser', // 解析器
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    // 'prettier',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended',
    'prettier'
  ],
  rules: {
    'vue/html-self-closing': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    'no-control-regex': 'off',
    'no-case-declarations': 'off',
    'no-undef': 'off',
    'no-empty': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/no-unused-components': 'off'
  }
}
