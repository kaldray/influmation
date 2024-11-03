import { configApp } from '@adonisjs/eslint-config'
export default configApp({
  files: ['**/*.ts', '**/*.tsx'],
  rules: {
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase', 'snake_case'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'class',
        format: ['PascalCase'],
      },
    ],
  },
})
