// src/modules/hotel/hotel.routes.js
import express from 'express';
import { addFood, getMyListings, getFoodDetails } from './hotel.controller.js';
import { protect } from '../../middlewares/auth.js'; // Path to the auth middleware

const router = express.Router();

// All hotel routes require authentication
router.use(protect);

router.post('/food/add', addFood);
router.get('/food/my-listings', getMyListings);
router.get('/food/:id', getFoodDetails);

export default router;