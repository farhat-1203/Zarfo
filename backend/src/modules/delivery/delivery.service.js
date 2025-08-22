import Delivery from './delivery.model.js';
import Food from '../hotel/hotel.model.js';
import User from '../auth/auth.model.js';

export const createDeliveryTask = async (foodId, recipientId) => {
  const food = await Food.findById(foodId).populate('hotelId');
  const recipient = await User.findById(recipientId);

  if (!food || !recipient) {
    throw new Error('Food or recipient not found.');
  }

  // Future: Here is where the AI would decide to donate
  // For now, let's assume this function is only called for donations.
  if (food.status === 'listed_for_sale') {
      throw new Error('This food is listed for sale, not donation.');
  }

  const newDelivery = await Delivery.create({
    foodId: food._id,
    recipientId: recipient._id,
    pickupLocation: food.pickupAddress || 'Placeholder Hotel Address', // Future: Add address field to food model
    dropoffLocation: recipient.location || 'Placeholder Recipient Location', // Future: Add location field to user model
    status: 'unassigned',
  });

  // Mark the food as no longer available
  food.isAvailable = false;
  food.status = 'donated';
  await food.save();

  return newDelivery;
};

export const getAvailableTasksForRobin = async () => {
  const availableTasks = await Delivery.find({ status: 'unassigned' });
  return availableTasks;
};

export const assignTaskToRobin = async (taskId, robinId) => {
  const task = await Delivery.findById(taskId);
  if (!task) throw new Error('Delivery task not found.');
  if (task.status !== 'unassigned') throw new Error('Task is already assigned or in progress.');
  
  task.deliveryAgentId = robinId;
  task.status = 'assigned';
  await task.save();
  
  return task;
};

export const updateDeliveryStatus = async (taskId, status) => {
    const task = await Delivery.findById(taskId);
    if (!task) throw new Error('Delivery task not found.');
    
    task.status = status;
    await task.save();
    return task;
};