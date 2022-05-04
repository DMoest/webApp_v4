module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/rule-name': 'error',
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    "@typescript-eslint/no-misused-new": "error",
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          // add a custom message to help explain why not to use it
          Foo: "Don't use Foo because it is unsafe",

          // add a custom message, AND tell the plugin how to fix it
          String: {
            message: 'Use string instead',
            fixWith: 'string',
          },
          '{}': {
            message: 'Use object instead',
            fixWith: 'object',
          },
        },
      },
    ],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: false,
      },
    ],
    "@typescript-eslint/no-this-alias": [
      "error",
      {
        "allowDestructuring": false, // Disallow `const { props, state } = this`; true by default
        "allowedNames": ["self"] // Allow `const self = this`; `[]` by default
      }
    ]
  },
};
