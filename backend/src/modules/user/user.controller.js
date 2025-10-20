import { getAvailableFood, placeOrder } from './user.service.js';
import { getUserOrders } from "./user.service.js";

export const fetchMyOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await getUserOrders(userId);
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};


export const browseFood = async (req, res, next) => {
  try {
    console.log("Browse food query params:", req.query);
    const filters = req.query;
    console.log(filters);
    const availableFood = await getAvailableFood(filters);
    console.log(availableFood);
    console.log("Returning food count:", availableFood.length);
    res.status(200).json(availableFood);
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    console.log("Create order body:", req.body);
    console.log("Authenticated user:", req.user);
    const { foodId } = req.body;
    const userId = req.user.id;
    const order = await placeOrder(userId, foodId);
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    next(err);
  }
};