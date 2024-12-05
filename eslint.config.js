module.exports = {
    languageOptions: {
        globals: {
            node: true,
            es2021: true,
        },
        parserOptions: {
            ecmaVersion: 12,
            sourceType: 'module',
            project: './tsconfig.json',
        },
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
};
