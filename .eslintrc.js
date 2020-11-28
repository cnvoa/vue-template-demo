module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [ // 配置标准的js风格
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint' //指定eslint解析器
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'arrow-parens': 0,                                              //箭头函数用小括号括起来
    // 'generator-star-spacing': 0,                                    //生成器函数*的前后空格
    // "no-undef": 1,                                                  //未定义的变量
    // "no-unused-vars": [0, {                                         //声明后未被使用的变量或参数
    //   "vars": "local",
    //   "args": "none"
    // }],
    // "semi": [0],                                                     //语句分号结尾
    // "no-multiple-empty-lines": [0, { "max": 100 }],                    //空行最多不能超过100行
    // "no-mixed-spaces-and-tabs": [0],                                //禁止混用tab和空格
    // "no-tabs": 'off',
    // "comma-spacing": 0,//逗号前后的空格
    // "keyword-spacing": 0,　　 //关键字前后必须有空格 如 } else {
    // "no-irregular-whitespace": 0,//不能有不规则的空格
    // "no-multi-spaces": 0, //不能用多余的空格
    // "spaced-comment": 0, 　　　　　　　　                              // 注释前必须有空格
    // "indent": ["off", 2],
    // "handle-callback-err": 0,                                          //nodejs 处理错误
    // "padded-blocks": 0,                                               //块语句内行首行尾是否要空行
    // "camelcase": 0,                                                   //强制驼峰法命名
    // "space-before-function-paren": 0,                                    //函数定义时括号前面要不要有空格
    // "eqeqeq": 0,                                                       //比较的时候使用严格等于
    // "eol-last": 0,
    // "no-trailing-spaces": 0,                                             //一行最后不允许有空格
    // "space-before-blocks": 0,                                             //块前的空格
    // "comma-dangle": ["error", "never"], 
  }
}

// "off" 或者 0  // 关闭规则
// "warn" 或者 1  // 打开规则，作为警告（信息打印黄色字体）
// "error" 或者 2  // 打开规则，作为错误（信息打印红色字体）