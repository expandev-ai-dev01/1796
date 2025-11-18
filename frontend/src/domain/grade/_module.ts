/**
 * @module grade
 * @summary Manages student grades, including creation, retrieval, updates, and deletion.
 * @domain functional
 * @version 1.0.0
 */

export * from './services';
export * from './hooks';
export * from './components';
export * from './types';

export const moduleMetadata = {
  name: 'grade',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: ['GradeForm'],
  publicHooks: ['useCreateGrade'],
  publicServices: ['gradeService'],
  publicStores: [],
  dependencies: {
    internal: ['@/core/lib/api'],
    external: ['@tanstack/react-query'],
    domains: [],
  },
  exports: {
    components: ['GradeForm'],
    hooks: ['useCreateGrade'],
    services: ['gradeService'],
    stores: [],
    types: ['Grade', 'CreateGradeDTO'],
    utils: [],
  },
} as const;
