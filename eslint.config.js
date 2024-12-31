import { configApp } from '@adonisjs/eslint-config'
import reactCompiler from 'eslint-plugin-react-compiler'

export default configApp({
  files: ['**/*.ts', '**/*.tsx'],
  plugins: {
    'react-compiler': reactCompiler,
  },
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
    'react-compiler/react-compiler': 'error',
  },
})
