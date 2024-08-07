module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true,
        'react-native/react-native': true,
    },
    extends: [
        'eslint:recommended',
        'prettier',
        'plugin:import/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:jsx-a11y/recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react-hooks/recommended',
        'plugin:react-native/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    plugins: ['react', '@typescript-eslint', 'import', 'jsx-a11y', 'react-native'],
    rules: {
        'no-array-constructor': 'off',
        '@typescript-eslint/no-array-constructor': ['error'],
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': ['error'],
        'no-extra-semi': 'off',
        '@typescript-eslint/no-extra-semi': ['error'],
        'no-implied-eval': 'off',
        '@typescript-eslint/no-implied-eval': ['error'],
        'no-loss-of-precision': 'off',
        '@typescript-eslint/no-loss-of-precision': ['error'],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        'require-await': 'off',
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-extra-non-null-assertion': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-unnecessary-type-constraint': 'error',
        '@typescript-eslint/no-unsafe-argument': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'error',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/restrict-plus-operands': 'error',
        '@typescript-eslint/unbound-method': [
            'error',
            {
                ignoreStatic: true,
            },
        ],
        '@typescript-eslint/no-unnecessary-type-assertion': [
            'error',
            { typesToIgnore: ['Foo'] },
        ],
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
                    Number: {
                        message: 'Use number instead',
                        fixWith: 'number',
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
        '@typescript-eslint/no-misused-promises': [
            'error',
            {
                checksConditionals: false,
                checksVoidReturn: {
                    arguments: false,
                    attributes: false,
                },
            },
        ],
        '@typescript-eslint/no-this-alias': [
            'warn',
            {
                // Disallow `const { props, state } = this`; true by default
                allowDestructuring: false,
                // Allow `const self = this`; `[]` by default
                allowedNames: ['self'],
            },
        ],

        // Adjust the import/namespace rule:
        'import/namespace': 0,

        // Add React Native specific rules if you wish:
        'react-native/no-unused-styles': 2,
        'react-native/split-platform-components': 2,
        'max-len': ['error', { code: 120 }],
    },
};
