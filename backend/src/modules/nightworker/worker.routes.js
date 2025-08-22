import express from 'express';
import { getMyTasks, confirmReceipt } from './worker.controller.js';
import { protect } from '../../middlewares/auth.js';
import { checkRole } from '../../middlewares/checkRole.js';

const router = express.Router();

// All worker routes require authentication
router.use(protect);
router.use(checkRole('worker'));

router.get('/my-tasks', getMyTasks);
router.post('/tasks/confirm', confirmReceipt);

export default router;