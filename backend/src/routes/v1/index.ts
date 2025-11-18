/**
 * @summary
 * Router for API version 1. Aggregates all V1 routes (internal and external).
 */

import { Router } from 'express';
import internalRoutes from './internalRoutes';
import externalRoutes from './externalRoutes';

const router = Router();

// Mount internal (authenticated) routes
router.use('/internal', internalRoutes);

// Mount external (public) routes
router.use('/external', externalRoutes);

export default router;
