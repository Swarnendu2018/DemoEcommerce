import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    ignores:['node_modules/**'],
    languageOptions:{
      ecmaVersion:2021,
      sourceType: 'module',
      globals:{
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
        semi: ['error','always'],
        quotes:['error','single'],
        'no-unused-vars':['warn'],
        'no-undef':'error'
    }
  }
];