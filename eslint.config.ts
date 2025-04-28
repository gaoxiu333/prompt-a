import eslintPlugin from '@eslint/js';
// @ts-expect-error 此包没有类型定义
import nextPlugin from '@next/eslint-plugin-next';
import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';
// @ts-expect-error 此包没有类型定义
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tseslint, { configs as tseslintConfigs } from 'typescript-eslint';

// =========================================
// 基础 ESLint 配置
// =========================================
const eslintConfig = [
  {
    name: 'custom/eslint/recommended',
    files: ['**/*.mjs', '**/*.ts?(x)'],
    ...eslintPlugin.configs.recommended,
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
  },
  {
    // 对 .mjs 文件禁用类型检查
    files: ['**/*.mjs'],
    ...tseslintConfigs.disableTypeChecked,
    name: 'custom/typescript-eslint/disable-type-checked',
  },
);

// =========================================
// Next.js 相关配置
// =========================================
const nextConfig = [
  {
    name: 'custom/next/config',
    // 此配置不设置 files 选项，因为我们想将其应用于所有文件

    // 插件配置
    plugins: {
      react: reactPlugin, // React 核心插件
      'jsx-a11y': jsxA11yPlugin, // 可访问性检查
      'react-hooks': reactHooksPlugin, // React Hooks 规则
      '@next/next': nextPlugin, // Next.js 特定规则
      import: importPlugin, // ES6 模块导入导出规则
    },

    // 规则配置
    rules: {
      // React 相关规则
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,

      // React Hooks 规则
      ...reactHooksPlugin.configs.recommended.rules,

      // Next.js 规则
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules, // Next.js 严格模式

      // 可访问性规则 (使用严格模式)
      ...jsxA11yPlugin.configs.strict.rules,

      // 自定义规则调整
      // 导出规则// =========================================
      'import/no-anonymous-default-export': 'warn', // 警告匿名默认导出
      'import/order': 'off', // 禁用可能与 Prettier 冲突的规则
      'import/first': 'error', // import 语句必须放在文件最前面
      'import/newline-after-import': 'error', // import 语句后必须空一行
      'import/no-duplicates': 'error', // 禁止重复导入
      // react
      'react/no-unknown-property': 'off', // 禁用未知属性检查
      'react/react-in-jsx-scope': 'off', // 无需导入 React
      'react/prop-types': 'off', // 禁用 PropTypes 检查
      'react/jsx-no-target-blank': 'off', // 允许 target="_blank"

      // 可访问性警告
      'jsx-a11y/alt-text': [
        'warn',
        {
          elements: ['img'],
          img: ['Image'],
        },
      ],
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
    },

    // 全局设置
    settings: {
      react: {
        version: 'detect', // 自动检测 React 版本
      },

      'import/resolver': {
        typescript: {
          alwaysTryTypes: true, // 总是尝试解析类型定义
        },
      },
    },
  },
] as FlatConfig.Config[];

// =========================================
// 导出最终配置
// =========================================
export default [
  ...eslintConfig, // 基础配置
  ...ignoresConfig, // 忽略文件配置
  ...tseslintConfig, // TypeScript 配置
  ...nextConfig, // Next.js 配置
  eslintPluginPrettier, // Prettier 配置
] satisfies FlatConfig.Config[];
