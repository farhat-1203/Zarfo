import streamlit as st
import pandas as pd
import numpy as np
import joblib
from datetime import datetime, time


st.set_page_config(page_title="Zarfo – Smart Food Decision Engine", layout="centered")
st.title("Zarfo – Smart Food Decision Engine")
st.markdown(
    """
    ### Empowering Hotels to Save Food, Serve Better  
    Enter your food details below — and let **Zarfo’s AI Assistant** tell you whether  
    your dish should be **sold at a smart price** or **donated to those in need** before expiry.  
    """
)

# Load the Trained Models
@st.cache_resource
def load_models():
    """Loads the classifier, regressor, and label encoder from disk."""
    try:
        classifier = joblib.load("zarfo_classifier_pipeline.pkl")
        regressor = joblib.load("zarfo_regressor_pipeline.pkl")
        label_encoder = joblib.load("zarfo_label_encoder.pkl")
        return classifier, regressor, label_encoder
    except Exception as e:
        st.error(f"Error loading models: Could not find or load necessary model files (.pkl). Please verify file availability. Error: {e}")
        st.stop()

# Initialize all the models 
classifier, regressor, label_encoder = load_models()


# Input form for Hotel Portal
with st.form("food_form"):
    st.subheader("Enter Food Details")

    col1, col2 = st.columns(2)

    with col1:
        food_name = st.text_input("Food Name", placeholder="e.g., Veg Biryani")
        category = st.selectbox(
            "Category", 
            ["veg", "non-veg", "sweet", "spicy", "other"]
        )

        # Preparation Date & Time 
        prep_date = st.date_input("Preparation Date")
        prep_time = st.time_input("Preparation Time", value=time(12, 0))
        prep_datetime = datetime.combine(prep_date, prep_time)

    with col2:
        # Expiry Date & Time
        expiry_date = st.date_input("Expiry Date")
        expiry_time = st.time_input("Expiry Time", value=time(18, 0))
        expiry_datetime = datetime.combine(expiry_date, expiry_time)

        quantity = st.number_input("Quantity (in servings/kg)", min_value=1.0, value=5.0, step=1.0)
        actual_price = st.number_input("Actual Price (₹)", min_value=0.0, value=150.0, step=5.0)

    notes = st.text_area("Notes (Optional)", placeholder="e.g., Special dish, left from lunch buffet...")

    submitted = st.form_submit_button("Analyze with Zarfo AI")


# When the user submits the form
if submitted:
    now = datetime.now()

    # agar expiry time prep time se pehle hai toh shelf life negative ho sakta hai isliye max with 0 le rahe hai idhar)
    shelf_life = max((expiry_datetime - prep_datetime).total_seconds() / 3600, 0)
    time_left = max((expiry_datetime - now).total_seconds() / 3600, 0)

    # Input validation checks 
    if time_left <= 0:
        st.error("Invalid input. The food's expiry time is in the past or current time.")
        st.stop()
    if shelf_life <= 0:
        st.error("Invalid input. Expiry date/time must be after the preparation date/time.")
        st.stop()

    # when the remaining time is low, demand typically drops sharply so we model that non-linear effect (i.e quadratic decay)
    time_ratio = time_left / shelf_life
    # this calculates a base demand probability between 0 and 1 (higher when more time is left)
    base_demand = np.clip(time_ratio**2, 0.0, 1.0) 
    # here we add some rendom noise to simulate a real-world scenario
    demand_prob = np.clip(base_demand * np.random.uniform(0.7, 1.1), 0, 1)

    # Prepare DataFrame for model input (this should match training schema exactly!!!!!) 
    input_data = pd.DataFrame([{
        "ShelfLife": shelf_life,
        "TimeLeft": time_left,
        "Quantity": quantity,
        "Price": actual_price,
        "DemandProb": demand_prob,
        "Item": food_name,
        "Category": category 
    }])

    st.markdown("### Computed Features")
    st.dataframe(input_data)

    try:
        # Step 1: Predict Action using the classifier
        pred_encoded = classifier.predict(input_data)[0]
        decision = label_encoder.inverse_transform([pred_encoded])[0]

        # Step 2: If decision is SELL, predict the suggested price using the regressor
        if decision.lower() == "sell":
            predicted_price = regressor.predict(input_data)[0]
            st.success("### Decision: SELL")
            st.markdown(f"**Suggested Smart Price:** ₹{predicted_price:.2f}")
        # Step 2: If decision is DONATE toh proceed accordingly (no price prediction here)
        else:
            st.warning("### Decision: DONATE")
            st.markdown("This food item should be promptly redistributed to maximize its social impact before the expiry window closes.") # this is a simple message telling user to donate jaldi se

        st.markdown("---")
        st.caption(f"Time Left: {time_left:.2f} hours | Shelf Life: {shelf_life:.2f} hours | Demand Probability: {demand_prob:.2f}")

    except Exception as e:
        # Detailed error message for debugging data input issues.
        st.error(f"Prediction execution failed. Please confirm that the input data columns, data types, and categorical feature values (e.g., 'Category') strictly match the model's training schema. Error details: {e}")
