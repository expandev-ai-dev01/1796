/**
 * @summary
 * Defines internal API routes that typically require authentication.
 * This is where feature-specific endpoints will be added.
 */

import { Router } from 'express';
import gradeRoutes from './gradeRoutes';

const router = Router();

// Mount feature-specific routes
router.use('/grades', gradeRoutes);

// Placeholder for other internal routes
router.get('/', (req, res) => {
  res.json({ message: 'Internal API endpoint' });
});

export default router;
