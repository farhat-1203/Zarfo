// src/modules/hotel/hotel.controller.js
import {
  addFoodListing,
  getHotelListings,
  getFoodListingById,
} from "./hotel.service.js";

export const addFood = async (req, res, next) => {
  try {
    const hotelId = req.user.id;

    const listingData = {
      ...req.body,
      quantity: Number(req.body.quantity),
      prepTime: new Date(req.body.prepTime),
      expiryTime: new Date(req.body.expiryTime),
      photo: req.file ? req.file.buffer : "", // raw buffer from upload
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
