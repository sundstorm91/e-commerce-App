// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import prettier from 'eslint-config-prettier/flat'

// Фильтруем правила TypeScript, чтобы они не применялись к JS-файлам
const typeScriptOverrideConfig = tseslint.config({
  files: ['**/*.{ts,tsx}'],
  extends: [
    tseslint.configs.recommended, // Базовые правила TS
    prettier
  ],
  rules: {
    // Мягкие настройки для TypeScript
    '@typescript-eslint/no-unused-vars': 'warn', // Предупреждение вместо ошибки
    '@typescript-eslint/no-explicit-any': 'warn', // Разрешаем any, но с предупреждением
  },
});

export default tseslint.config(
  {
    // Глобальные настройки для ВСЕХ файлов
    ignores: ['dist/', 'eslint.config.js'], // Что игнорировать
  },

  {
    // Настройки для ВСЕХ JavaScript и React файлов
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      /* prettier: prettierPlugin, */
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser, // Браузерные глобалы (document, window)
        ...globals.es2020, // Глобалы ES2020
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Включаем поддержку JSX
        },
      },
    },
    rules: {
      // Базовые правила JavaScript
      ...js.configs.recommended.rules,

      // Правила React
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,

      // Правила React Hooks (обязательные!)
      ...reactHooks.configs.recommended.rules,

      // Наши кастомные, более мягкие правила
      'react-refresh/only-export-components': 'warn',
      'no-unused-vars': 'off', // Отключаем встроенное правило, т.к. используем TS-версию
    },
  },

  // Подключаем конфиг для TypeScript (правила только для .ts/.tsx файлов)
  typeScriptOverrideConfig,
  prettierConfig
);