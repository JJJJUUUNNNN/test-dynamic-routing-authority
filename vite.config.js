/* eslint-disable import/no-unresolved */
import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
// import eslintPlugin from 'vite-plugin-eslint'

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    Vue(),
    // eslintPlugin({
    //   include:['src/**/*.js','src/**/*.vue','src/*.js','src/*.vue']
    // }),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true,
      },
    }),

    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        ElementPlusResolver(),
      ],
    }),

    Icons({
      autoInstall: true,
    }),
  ],
});
