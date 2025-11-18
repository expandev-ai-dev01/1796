/**
 * @summary
 * Defines external (public) API routes that do not require authentication.
 */

import { Router } from 'express';

const router = Router();

// Placeholder for external routes

router.get('/', (req, res) => {
  res.json({ message: 'External API endpoint' });
});

export default router;
