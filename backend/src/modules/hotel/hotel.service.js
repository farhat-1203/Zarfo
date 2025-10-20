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