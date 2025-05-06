import js from '@eslint/js';
import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';
import eslintConfigPrettier from 'eslint-plugin-prettier/recommended';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint, { configs as tseslintConfigs } from 'typescript-eslint';

// =========================================
// 基础 ESLint 配置
// =========================================
const eslintConfig = [
  {
    name: 'custom/eslint/recommended',
    files: ['**/*.mjs', '**/*.ts?(x)'],
    ...js.configs.recommended,
  },
];

// =========================================
// 忽略文件配置
// =========================================
const ignoresConfig = [
  {
    name: 'custom/eslint/ignores',
    // ignores 选项需要在单独的配置对象中 替代 .eslintignore 文件
    ignores: [
      '.next/', // Next.js 构建输出
      '.vscode/', // VS Code 配置
      'public/', // 静态资源
      '.remarkrc.mjs', // Remark 配置
    ],
  },
] as FlatConfig.Config[];

// =========================================
// TypeScript ESLint 配置
// =========================================
const tseslintConfig = tseslint.config(
  {
    name: 'custom/typescript-eslint/recommended',
    files: ['**/*.mjs', '**/*.ts?(x)'],
    extends: [...tseslintConfigs.recommended] as FlatConfig.ConfigArray,
    languageOptions: {
      parserOptions: {
        // 启用类型检查功能
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        // it is recommended to keep version warnings turned on
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    // 对 .mjs 文件禁用类型检查
    files: ['**/*.mjs'],
    ...tseslintConfigs.disableTypeChecked,
    name: 'custom/typescript-eslint/disable-type-checked',
  },
);
const turboConfig = [
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },
] as FlatConfig.Config[];

export const config = [
  ...eslintConfig, // 基础配置
  ...ignoresConfig, // 忽略文件配置
  ...tseslintConfig, // TypeScript 配置
  ...turboConfig, // Turbo 配置
  eslintConfigPrettier, // Prettier 配置
] satisfies FlatConfig.Config[];
