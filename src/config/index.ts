import type { Config } from '@/types';

const config: Config = {
  DEFAULT_GRID_SIZE: 9,
  QUADRANT_SIZE: 3,
  DEFAULT_VERBOSE_MODE: true
} as const;

export default config;
