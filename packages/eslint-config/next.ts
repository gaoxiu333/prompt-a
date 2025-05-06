// @ts-expect-error 此包没有类型定义
import nextPlugin from '@next/eslint-plugin-next';
import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';
// @ts-expect-error 此包没有类型定义
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import eslintConfigPrettier from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

import { config as baseConfig } from './base';

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

export const config = [
  ...baseConfig,
  ...nextConfig,
  eslintConfigPrettier, // Prettier 配置
] satisfies FlatConfig.Config[];
