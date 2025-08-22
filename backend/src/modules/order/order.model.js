// src/modules/order/order.model.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending_pickup', 'on_the_way', 'delivered', 'cancelled'],
    default: 'pending_pickup',
  },
  // Future fields could include:
  // deliveryAgentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // pickupTime: { type: Date },
  // deliveryTime: { type: Date },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);