module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	parser: '@typescript-eslint/parser',
	extends: [
		'plugin:@typescript-eslint/recommended',
		'eslint:recommended',
		'plugin:react/recommended',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'max-lines': ['error', 120],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/ban-ts-ignore': 'off',
	},
};
