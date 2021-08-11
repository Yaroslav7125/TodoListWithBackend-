module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // npm i --save-dev eslint-plugin-vue eslint-import-resolver-nuxt
    'plugin:@web-bee-ru/nuxt', // nuxt (vue)
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
  },
};
