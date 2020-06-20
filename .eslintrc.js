module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: 'babel-eslint',
  plugins: ['prettier', 'react', 'react-hooks'],
  rules: {
    'import/no-extraneous-dependencies': 'warn',
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    "camelcase": "warn",
    "func-names": "warn",
    "global-require": "warn",
    "radix": "warn",
    "no-restricted-globals": "warn",
    // "react/forbid-prop-types": "warn",
    'prettier/prettier': [
      'error',
      {
        semi: true,
        tabWidth: 2,
        printWidth: 80,
        useTabs: false,
        singleQuote: true,
        bracketSpacing: true,
        arrowParens: 'always',
        trailingComma: 'all',
      }
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'linebreak-style': 0,
    'react/forbid-prop-types': 0,
    'react/prop-types': 0,
    'import/first': 0,
  }
};
