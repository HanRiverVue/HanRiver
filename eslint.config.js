import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  {
    rules: {
      'vue/no-mutating-props': 'off', // 규칙 완전 비활성화
      // 또는
      // 'vue/no-mutating-props': 'warn'  // 경고로 변경
    },
  },
];
