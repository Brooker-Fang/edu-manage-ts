module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 支持 定义接口多行 无需加分号
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'none',
        requireLast: true,
      },
    },
    ],
    // 单引号
    quotes: [
      1,
      'single',
    ],
    'comma-dangle': ['error', {
      arrays: 'always',
      objects: 'always',
      imports: 'never',
      exports: 'never',
      functions: 'never',
    },
    ],
  },
}
