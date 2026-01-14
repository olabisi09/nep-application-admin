// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";


// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ];

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import eslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import immutable from 'eslint-plugin-immutable';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
  allConfig: pluginJs.configs.all,
});

export default [
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    ignores: ['**/dist', '**/.eslintrc.json', '**/node_modules', '**/out'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        GetWalletAccountDetails: 'readonly',
      },
    },
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-undef': 'off',
    },
  },

  ...fixupConfigRules(
    compat.extends('eslint:recommended', 'plugin:import/errors', 'plugin:import/typescript', 'prettier'),
  ),
  {
    plugins: {
      '@typescript-eslint': eslintPlugin,
      immutable,
      'unused-imports': unusedImports,
      'react-refresh': reactRefresh,
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      'no-redeclare': 'off',
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],
      // 'max-lines': [
      //   'error',
      //   {
      //     // max: 300,
      //     skipBlankLines: true,
      //     skipComments: true,
      //   },
      // ],
      '@typescript-eslint/no-explicit-any': 'off',
      'unused-imports/no-unused-imports': 'error',
      // 'sort-imports': [
      //   'error',
      //   {
      //     ignoreDeclarationSort: true,
      //   },
      // ],
      // 'import/namespace': 0,
      // 'import/no-unresolved': 0,
      // 'import/order': [
      //   'error',
      //   {
      //     groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
      //     alphabetize: {
      //       order: 'asc',
      //       caseInsensitive: true,
      //     },
      //     'newlines-between': 'always',
      //     pathGroups: [
      //       {
      //         pattern: 'react',
      //         group: 'external',
      //         position: 'before',
      //       },
      //       {
      //         pattern: '@phx/**/**',
      //         group: 'internal',
      //         position: 'after',
      //       },
      //     ],
      //     pathGroupsExcludedImportTypes: ['builtin'],
      //   },
      // ],
    },
  },
  eslintConfigPrettier,
];