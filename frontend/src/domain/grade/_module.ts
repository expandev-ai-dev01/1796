/**
 * @module grade
 * @summary Manages student grades, including creation, retrieval, updates, and deletion.
 * @domain functional
 * @version 1.0.0
 */

// Public exports will be added here as the domain is built out.

export const moduleMetadata = {
  name: 'grade',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: [],
  publicHooks: [],
  publicServices: [],
  publicStores: [],
  dependencies: {
    internal: ['@/core/lib/api'],
    external: ['@tanstack/react-query'],
    domains: [],
  },
  exports: {
    components: [],
    hooks: [],
    services: [],
    stores: [],
    types: [],
    utils: [],
  },
} as const;
