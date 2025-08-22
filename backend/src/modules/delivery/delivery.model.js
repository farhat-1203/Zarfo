import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true,
  },
  deliveryAgentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null, // Assigned later
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Could be a Night Worker or a specific shelter
    required: true,
  },
  pickupLocation: {
    type: String, // Will be the hotel address
    required: true,
  },
  dropoffLocation: {
    type: String, // Will be the recipient's location
    required: true,
  },
  status: {
    type: String,
    enum: ['unassigned', 'assigned', 'picked_up', 'delivered', 'cancelled'],
    default: 'unassigned',
  },
  deliveryProof: {
    type: String, // URL for photo or signature
    default: null,
  },
}, { timestamps: true });

export default mongoose.model('Delivery', deliverySchema);