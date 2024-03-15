module.exports = {
  // extends: ["eslint:recommended"],//继承官方规则，也可以下载其他cli规则并继承，例如React Cli的
  env: {
    node: true, //开启node环境的全局变量
    browser: true
  },
  parserOptions: {
    ecmaVersion: 8, //解析ES6版本
    sourceType: 'module',
  },
  // rules: {
  //   semi: 'error',//检查使用分号
  //   eqeqeq: ['warn', 'smart'], //检查== 和 !=
  //   "no-console": "warn",//检查console
  //   "no-var": "error"
  // }
};