const reactPlugin = require('eslint-plugin-react');
const babelParser = require('@babel/eslint-parser');

module.exports = [
  {
    languageOptions: {
      globals: {
        browser: 'readonly',
        es2021: 'readonly'
      },
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false, // Desativar a verificação do arquivo de configuração do Babel
        babelOptions: {
          presets: ['@babel/preset-react'], // Adiciona o preset do React para reconhecer JSX
          plugins: []
        },
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
      }
    },
    plugins: {
      react: reactPlugin
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error'
    }
  }
];
