module.exports = {
  env: {
    browser: false,
    esnext: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react', 'react-native'],
  rules: {
    indent: ['error', 'tab'],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    camelCase: ['error'],
    'func-style': ['error', 'declaration', {allowArrowFunctions: true}],
    'arrow-body-style': ['error', 'always'],
    arrowParens: ['error', 'always'],
    'class-methods-use-this': ['warn'],
    complexity: ['error', 5],
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 2,
    'react-native/sort-styles': [
      'error',
      'asc',
      {
        ignoreClassNames: false,
        ignoreStyleProperties: false,
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {extensions: ['.ts', '.tsx', '.js', '.jsx']},
    ],
    // prevent eslint to complain about the "styles" variable being used before it was defined
    'no-use-before-define': ['error', {variables: false}],
    // ignore errors for the react-navigation package
    //  "react/prop-types": [
    //     "error",
    //     { "ignore": ["navigation", "navigation.navigate"] }],
    // ignore errors for import directives
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
