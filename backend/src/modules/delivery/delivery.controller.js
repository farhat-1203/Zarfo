import { getAvailableTasksForRobin, assignTaskToRobin, updateDeliveryStatus } from './delivery.service.js';

export const getAvailableTasks = async (req, res, next) => {
  try {
    const tasks = await getAvailableTasksForRobin();
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

export const acceptTask = async (req, res, next) => {
  try {
    const { taskId } = req.body;
    const robinId = req.user.id;
    
    const task = await assignTaskToRobin(taskId, robinId);
    res.status(200).json({ message: 'Task assigned successfully', task });
  } catch (err) {
    next(err);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { taskId, status } = req.body;
    const task = await updateDeliveryStatus(taskId, status);
    res.status(200).json({ message: 'Status updated successfully', task });
  } catch (err) {
    next(err);
  }
};