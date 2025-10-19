// src/modules/hotel/hotel.controller.js
import {
  addFoodListing,
  getHotelListings,
  getFoodListingById,
  getAIDecision,
} from "./hotel.service.js";

export const addFood = async (req, res, next) => {
  try {
    const hotelId = req.user.id;

    const prep = new Date(req.body.prepTime);
    const expiry = new Date(req.body.expiryTime);

    // Extract data for AI service
    const aiInput = {
      name: req.body.name,
      category: req.body.category,
      prepDate: prep.toISOString().split("T")[0],
      prepTime: prep.toTimeString().slice(0, 5),
      expiryDate: expiry.toISOString().split("T")[0],
      expiryTime: expiry.toTimeString().slice(0, 5),
      quantity: Number(req.body.quantity),
      sellingPrice: Number(req.body.sellingPrice || 0),
    };

    // Call FastAPI to get prediction
    const aiPrediction = await getAIDecision(aiInput);
    console.log("AI Prediction:", aiPrediction);

    const listingData = {
      ...req.body,
      decision: aiPrediction.decision || "sell",
      sellingPrice: aiPrediction.suggested_price || req.body.sellingPrice,
      quantity: Number(req.body.quantity),
      prepTime: prep,
      expiryTime: expiry,
      photo: req.file ? req.file.buffer : "",
    };

    const food = await addFoodListing(listingData, hotelId);
    res.status(201).json({ message: "Food listed successfully", food });
  } catch (err) {
    next(err);
  }
};


export const getMyListings = async (req, res, next) => {
  try {
    const hotelId = req.user.id;
    const listings = await getHotelListings(hotelId);
    console.log("Listings retrieved:", listings);
    res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
};

export const getFoodDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await getFoodListingById(id);
    res.status(200).json(listing);
  } catch (err) {
    next(err);
  }
};
