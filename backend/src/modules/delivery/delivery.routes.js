import express from 'express';
import { getAvailableTasks, acceptTask, updateStatus } from './delivery.controller.js';
import { protect } from '../../middlewares/auth.js';
import { checkRole } from '../../middlewares/checkRole.js';

const router = express.Router();

// Routes for Night Robins
router.use(protect); // All routes below this require authentication
router.use(checkRole('robin')); // And all routes below this require the 'robin' role

router.get('/tasks/available', getAvailableTasks);
router.post('/tasks/accept', acceptTask);
router.post('/tasks/update-status', updateStatus);

export default router;