
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
import joblib
import pandas as pd
import numpy as np

app = FastAPI(title="Zarfo FastAPI Endpoint", version="2.0")

# Load all the required pre-trained models
classifier = joblib.load("zarfo_classifier_pipeline.pkl")
regressor = joblib.load("zarfo_regressor_pipeline.pkl")
label_encoder = joblib.load("zarfo_label_encoder.pkl")
# these are the models trained and saved previously for classification and regression tasks of our zarfo app
# as used in the Streamlit app

# Define request schema for the input data (this ensures that the data sent to the API is validated)
class FoodInput(BaseModel):
    FoodName: str
    Category: str
    PrepDate: str
    PrepTime: str
    ExpiryDate: str
    ExpiryTime: str
    Quantity: float
    Price: float


@app.post("/predict")
def predict_action(data: FoodInput):
    try:
        # Convert strings → datetime
        prep_datetime = datetime.strptime(f"{data.PrepDate} {data.PrepTime}", "%Y-%m-%d %H:%M")
        expiry_datetime = datetime.strptime(f"{data.ExpiryDate} {data.ExpiryTime}", "%Y-%m-%d %H:%M")
        now = datetime.now()

        # Derived features
        shelf_life = (expiry_datetime - prep_datetime).total_seconds() / 3600
        time_left = (expiry_datetime - now).total_seconds() / 3600

        if shelf_life <= 0 or time_left <= 0:
            return {"error": "Invalid time inputs — expiry must be after prep and current time."}

        # Placeholder for demand probability 
        demand_prob = np.clip((time_left / shelf_life) + np.random.uniform(-0.1, 0.1), 0, 1)

        # Build model input
        df = pd.DataFrame([{
            "ShelfLife": shelf_life,
            "TimeLeft": time_left,
            "Quantity": data.Quantity,
            "Price": data.Price,
            "DemandProb": demand_prob,
            "Item": data.FoodName,
            "Category": data.Category
        }])

        # Step 1: Classification (SELL / DONATE)
        pred_encoded = classifier.predict(df)[0]
        decision = label_encoder.inverse_transform([pred_encoded])[0]

        result = {
            "decision": decision,
            "ShelfLife": round(shelf_life, 2),
            "TimeLeft": round(time_left, 2),
            "DemandProb": round(float(demand_prob), 2)
        }

        # Step 2: If SELL → then predict the discounted price
        if decision.lower() == "sell":
            predicted_price = regressor.predict(df)[0]
            result["suggested_price"] = round(float(predicted_price), 2)
        else:
            result["suggested_price"] = None

        return result

    except Exception as e:
        return {"error": f"Processing error: {str(e)}"}
