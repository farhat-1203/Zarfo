import {
  addFoodListing,
  getHotelListings,
  getFoodListingById,
  getAIDecision,
} from "./hotel.service.js";

// Helper function to format Date object components for Python's strict parser
// here we format date as YYYY-MM-DD, because Python's datetime.strptime expects that format and the one that we are taking from the user is ISO format toh we need to convert it
const formatDateComponent = (dateObj) => dateObj.toISOString().split("T")[0]; // YYYY-MM-DD

// Helper function to format Time component for Python's strict parser
// similar to date we need to format time as HH:MM, because Python's datetime.strptime expects that format
const formatTimeComponent = (dateObj) => {
  // Get time string (e.g., "14:30:00 GMT+0530 (IST)") and slice to HH:MM (minutes)
  const timeString = dateObj.toTimeString().split(" ")[0]; // Gives HH:MM:SS

  // We trim it to HH:MM because that's what our FastAPI format ("%Y-%m-%d %H:%M") is set to
  return timeString.slice(0, 5);
};

export const addFood = async (req, res, next) => {
  try {
    const hotelId = req.user.id;

    const prep = new Date(req.body.prepTime);
    const expiry = new Date(req.body.expiryTime);

    // Use the original price for the AI model input
    const actualPrice = Number(req.body.sellingPrice || 0);

    // here we are checking all the keys are matching with the fastapi model keys (i.e. FoodInput model in fastapi)
    const aiInput = {
      FoodName: req.body.name,
      Category: req.body.category,
      PrepDate: formatDateComponent(prep),
      PrepTime: formatTimeComponent(prep),
      ExpiryDate: formatDateComponent(expiry),
      ExpiryTime: formatTimeComponent(expiry),
      Quantity: Number(req.body.quantity),
      Price: actualPrice,
    };

    // Call FastAPI to get prediction
    const aiPrediction = await getAIDecision(aiInput);
    // Preparing listing data to be saved in DB
    const decision = aiPrediction.decision?.toLowerCase() || "sell";
    const listingData = {
      ...req.body,
      decision,
      sellingPrice: actualPrice,
      aiSuggestedPrice: aiPrediction.suggested_price ?? null,
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
