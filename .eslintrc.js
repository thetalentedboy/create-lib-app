module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['prettier', 'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        eqeqeq: 2,
        semi: [2, 'always'],
        strict: 2,
        'no-console': 2,
        'prettier/prettier': 'warn',
        '@typescript-eslint/no-explicit-any': 'error',
        'no-debugger': 'warn',
        'semi-spacing': [0, { before: false, after: true }],
        'no-const-assign': 'warn',
        'no-dupe-args': 'warn',
        'no-empty-pattern': 'warn',
    },
};
