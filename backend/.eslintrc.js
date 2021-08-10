module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:@web-bee-ru/base', // js/ts only

    // npm i --save-dev eslint-plugin-vue
    //"plugin:@web-bee-ru/vue", // vue

    // npm i --save-dev eslint-plugin-vue eslint-import-resolver-nuxt
    //"plugin:@web-bee-ru/nuxt", // nuxt (vue)

    // npm i --save-dev eslint-plugin-react eslint-plugin-react-hooks
    //"plugin:@web-bee-ru/react", // react

    // npm i --save-dev eslint-plugin-react eslint-plugin-react-hooks
    //"plugin:@web-bee-ru/next", // next (react)
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
  },
};
