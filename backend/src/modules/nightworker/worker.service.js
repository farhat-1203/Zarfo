import Delivery from '../delivery/delivery.model.js';

export const getMyDeliveries = async (workerId) => {
  // Find all deliveries where this worker is the recipient
  const deliveries = await Delivery.find({ recipientId: workerId })
    .populate('foodId') // Get food details
    .sort({ createdAt: -1 });

  return deliveries;
};

export const confirmDeliveryReceipt = async (deliveryId, workerId) => {
  const delivery = await Delivery.findById(deliveryId);

  if (!delivery) {
    throw new Error('Delivery not found.');
  }

  // Ensure the worker is the correct recipient for this delivery
  if (delivery.recipientId.toString() !== workerId.toString()) {
    throw new Error('You are not authorized to confirm this delivery.');
  }

  // Update the status to delivered
  delivery.status = 'delivered';
  await delivery.save();

  return delivery;
};