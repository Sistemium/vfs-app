require('@rushstack/eslint-patch/modern-module-resolution');

// const path = require('node:path');
// const createAliasSetting = require('@vue/eslint-config-airbnb/createAliasSetting');

module.exports = {
  root: true,
  env: {
    'vue/setup-compiler-macros': true,
  },
  extends: [
    '@vue/typescript',
    'plugin:vue/essential',
    'plugin:vue-pug/vue3-recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',

  ],
  rules: {
    'vue/no-unused-vars': 'error',
    'import/prefer-default-export': 'off',
    'padded-blocks': 'off',
    'vue/html-self-closing': 'off',
    'vue/no-deprecated-slot-attribute': 'off',
    'vue/max-attributes-per-line': 0,
    'vuejs-accessibility/label-has-for': 'off',
    'vuejs-accessibility/alt-text': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'arrow-parens': [
      'error',
      'as-needed',
    ],
    'vue/order-in-components': 'off',
    'vue/require-default-prop': 'off',
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
      },
    ],
    'vue/multi-word-component-names': 'off',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
      },
    ],
  },
  settings: {
    // ...createAliasSetting({
    //   '@': `${path.resolve(__dirname, './src')}`,
    // }),
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
