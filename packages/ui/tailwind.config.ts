import SharedConfig from '@wpm-repo/tailwind-config';
import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [SharedConfig],
  content: SharedConfig.content
};

export default config;
