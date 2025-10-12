import express from 'express';
import { browseFood, createOrder, fetchMyOrders } from './user.controller.js';
import { protect } from '../../middlewares/auth.js';
import { checkRole } from '../../middlewares/checkRole.js'; // We'll create this middleware

const router = express.Router();

// Public route for anyone to browse food
router.get('/browse', browseFood);

// Protected route for authenticated users to place an order
router.post('/order/create', protect, checkRole('user'), createOrder);

router.get("/orders", protect, checkRole("user"), fetchMyOrders);


export default router;