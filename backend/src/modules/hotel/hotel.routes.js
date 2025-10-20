// src/modules/hotel/hotel.routes.js
import express from 'express';
import { addFood, getMyListings, getFoodDetails } from './hotel.controller.js';
import { protect } from '../../middlewares/auth.js'; // Path to the auth middleware
import multer from 'multer';

const router = express.Router();

// configure multer
const storage = multer.memoryStorage(); // or diskStorage for saving locally
const upload = multer({ storage });

router.use(protect);

// Use upload.single('photo') for the image input
router.post('/food/add', upload.single('photo'), addFood);
router.get('/food/my-listings', getMyListings);
router.get('/food/:id', getFoodDetails);

export default router;