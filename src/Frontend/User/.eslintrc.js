module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
	parserOptions: {
		parser: '@babel/eslint-parser',
	},
	plugins: ['prettier'],
	rules: {
		'vue/multi-word-component-names': 0,
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				semi: true,
				useTabs: true,
				tabWidth: 2,
				trailingComma: 'all',
				printWidth: 120,
				bracketSpacing: true,
				arrowParens: 'avoid',
				endOfLine: 'auto',
			},
		],
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	},
};
