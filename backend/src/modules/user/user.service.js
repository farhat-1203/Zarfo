import Food from '../hotel/hotel.model.js';
import Order from '../order/order.model.js';

export const getAvailableFood = async (filters = {}) => {
  const query = {
    isAvailable: true,
    status: 'listed_for_sale',
    expiryTime: { $gt: new Date() },
  };

  if (filters.category) {
    query.category = filters.category;
  }
  
  const availableFood = await Food.find(query).sort({ expiryTime: 1 });
  return availableFood;
};

export const placeOrder = async (userId, foodId) => {
  const food = await Food.findById(foodId);

  if (!food || food.status !== 'listed_for_sale' || !food.isAvailable) {
    throw new Error('Food is not available for purchase.');
  }

  // Use the Order model to create a new order
  const order = await Order.create({
    userId,
    foodId,
    status: 'pending_pickup',
  });

  // Mark the food as no longer available
  food.isAvailable = false;
  food.status = 'sold';
  await food.save();

  return order;
};