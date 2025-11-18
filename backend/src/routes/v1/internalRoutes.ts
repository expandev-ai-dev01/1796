/**
 * @summary
 * Defines internal API routes that typically require authentication.
 * This is where feature-specific endpoints will be added.
 */

import { Router } from 'express';

const router = Router();

// Placeholder for internal routes
// Example: router.use('/grades', gradeRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'Internal API endpoint' });
});

export default router;
