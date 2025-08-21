// src/modules/hotel/hotel.service.js
import Food from './hotel.model.js';
// import { getAIDecision } from '../ai/ai.service.js'; // Future integration

export const addFoodListing = async (listingData, hotelId) => {
  if (listingData.quantity <= 0) {
    throw new Error('Quantity must be greater than zero.');
  }

  // Future: Call AI service here to get a decision
  // const decision = await getAIDecision(listingData);

  const newListing = {
    ...listingData,
    hotelId,
    // decision: decision.type,
    // status: decision.type === 'sell' ? 'listed_for_sale' : 'listed_for_donation',
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