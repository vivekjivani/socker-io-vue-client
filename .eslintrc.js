module.exports = {
	root: true,
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		node: true,
	},
	extends: ['plugin:vue/essential', '@vue/airbnb'],
	parserOptions: {
		parser: '@babel/eslint-parser',
	},
	rules: {
		indent: [2, 'tab'],
		'no-tabs': 0,
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	},
};
