import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  staticDirs: ['../public'], // serve files from the public folder
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    'storybook-addon-remix-react-router',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  /** 스토리북 파일에서 import react 생략 가능*/
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),
  /** 웹팩 세팅 커스터마이징 */
  webpackFinal: async config => {
    const imageRule = config.module?.rules?.find(rule => {
      const test = (rule as { test: RegExp }).test;

      if (!test) return false;

      return test.test('.svg');
    }) as { [key: string]: any };

    imageRule.exclude = /\.svg$/;

    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          /** 절대경로 세팅 */
          '@': path.resolve(__dirname, '..', 'src'),
        },
      },
    };
  },
};
export default config;
