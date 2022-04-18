module.exports = {
	root: true,
	overrides: [
		{
			files: ['*.ts'],
			parserOptions: {
				project: ['tsconfig.json'],
				createDefaultProgram: true,
			},
			extends: [
				'eslint:recommended',
				'plugin:@angular-eslint/recommended',
				'plugin:@angular-eslint/template/process-inline-templates',
				'plugin:prettier/recommended',
			],
			rules: {
				'no-unused-vars': 'off',
				'@angular-eslint/component-selector': [
					'error',
					{
						prefix: 'app',
						style: 'kebab-case',
						type: 'element',
					},
				],
				'@angular-eslint/directive-selector': [
					'error',
					{
						prefix: 'app',
						style: 'camelCase',
						type: 'attribute',
					},
				],
			},
			env: {
				browser: true,
				node: true,
			},
		},
		{
			files: ['*.html'],
			extends: [
				'plugin:@angular-eslint/template/recommended',
			],
			rules: {},
		},
		{
			files: ['**/*.spec.ts'],
			env: {
				jest: true,
			},
		},
	],
};
