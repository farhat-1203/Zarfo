// src/modules/hotel/hotel.service.js
import Food from './hotel.model.js';
// import { getAIDecision } from '../ai/ai.service.js'; // Future integration

export const addFoodListing = async (listingData, hotelId) => {
  if (listingData.quantity <= 0) {
    throw new Error("Quantity must be greater than zero.");
  }

  // Convert uploaded image buffer to Base64
  let photoBase64 = "";
  if (listingData.photo && listingData.photo.length) {
    photoBase64 = listingData.photo.toString("base64");
  }

  const newListing = {
    ...listingData,
    hotelId,
    photo: photoBase64,
    status: listingData.status || "listed_for_sale",
    decision: listingData.decision || "sell",
  };

  const food = await Food.create(newListing);
  return food;
};

export const getHotelListings = async (hotelId) => {
  const listings = await Food.find({ hotelId }).sort({ createdAt: -1 });
  return listings;
};

export const getFoodListingById = async (listingId) => {
  const listing = await Food.findById(listingId);
  if (!listing) {
    throw new Error('Food listing not found.');
  }
  return listing;
};

export const getAIDecision = async (foodData) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/predict", {
      FoodName: foodData.name,
      Category: foodData.category,
      PrepDate: foodData.prepDate,
      PrepTime: foodData.prepTime,
      ExpiryDate: foodData.expiryDate,
      ExpiryTime: foodData.expiryTime,
      Quantity: foodData.quantity,
      Price: foodData.sellingPrice || 0,
    });

    return response.data;
  } catch (err) {
    console.error("AI Prediction Error:", err.message);
    throw new Error("AI service failed to respond");
  }
};