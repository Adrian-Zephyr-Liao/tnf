import { type Config, generator } from '@tanstack/router-generator';
import path from 'pathe';
import type { SyncOptions } from './sync.js';

export async function writeRouteTree({ context }: SyncOptions) {
  const {
    cwd,
    config,
    paths: { tmpPath },
  } = context;
  const { router } = config;

  await generator(
    {
      routeFileIgnorePrefix: '-',
      routesDirectory: path.join(cwd, 'src/pages'),
      generatedRouteTree: path.join(tmpPath, 'routeTree.gen.ts'),
      quoteStyle: 'single',
      semicolons: false,
      disableTypes: false,
      addExtensions: false,
      disableLogging: false,
      disableManifestGeneration: false,
      apiBase: '/api',
      routeTreeFileHeader: [
        '/* prettier-ignore-start */',
        '/* eslint-disable */',
        '// @ts-nocheck',
        '// noinspection JSUnusedGlobalSymbols',
      ],
      routeTreeFileFooter: ['/* prettier-ignore-end */'],
      indexToken: 'index',
      routeToken: 'route',
      experimental: {
        enableCodeSplitting: true,
      },
      ...(router?.convention || {}),
    } as Config,
    cwd,
  );
}
