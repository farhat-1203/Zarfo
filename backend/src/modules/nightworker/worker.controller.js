import { getMyDeliveries, confirmDeliveryReceipt } from './worker.service.js';

export const getMyTasks = async (req, res, next) => {
  try {
    const workerId = req.user.id;
    const deliveries = await getMyDeliveries(workerId);
    res.status(200).json(deliveries);
  } catch (err) {
    next(err);
  }
};

export const confirmReceipt = async (req, res, next) => {
  try {
    const { deliveryId } = req.body;
    const workerId = req.user.id;

    const delivery = await confirmDeliveryReceipt(deliveryId, workerId);
    res.status(200).json({ message: 'Delivery confirmed successfully', delivery });
  } catch (err) {
    next(err);
  }
};