import Food from '../hotel/hotel.model.js';
// import Order from '../order/order.model.js'; 

export const getAvailableFood = async (filters = {}) => {
  // Find food listings that are available and listed for sale
  const query = {
    isAvailable: true,
    status: 'listed_for_sale',
    expiryTime: { $gt: new Date() },
  };

  if (filters.category) {
    query.category = filters.category;
  }
  // Add other filters like price range, etc., in the future

  const availableFood = await Food.find(query).sort({ expiryTime: 1 }); // Sort by soonest expiry
  return availableFood;
};

export const placeOrder = async (userId, foodId) => {
  // 1. Find the food item to be ordered
  const food = await Food.findById(foodId);

  // 2. Basic checks
  if (!food || food.status !== 'listed_for_sale' || !food.isAvailable) {
    throw new Error('Food is not available for purchase.');
  }

  // 3. Create a new order
  const order = await Order.create({
    userId,
    foodId,
    status: 'pending_pickup',
  });

  // 4. Mark the food as no longer available for sale
  food.isAvailable = false;
  food.status = 'sold';
  await food.save();

  return order;
};

// We will add more service functions here, e.g., to track an order