module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      arrowFunctions: true
    }
  },
  plugins: [
    'react',
    'react-hooks',
    'prefer-arrow',
    '@typescript-eslint',
    'prettier'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/explicit-function-return-type': ['error'],
    quotes: ['error', 'single'],
    'arrow-body-style': ['error', 'as-needed'],
    'no-undefined': 'error',
    'no-console': ['warn'],
    'prettier/prettier': ['error'],
    'prefer-arrow/prefer-arrow-functions': [
      'warn',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
        allowStandaloneDeclarations: false
      }
    ]
  }
};
