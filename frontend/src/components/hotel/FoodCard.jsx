// src/modules/hotel/components/FoodCard.jsx
export default function FoodCard({ food }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2">{food.name}</h2>
      <p className="text-gray-600 mb-3">{food.description}</p>
      <p className="text-greenAccent font-medium">Qty: {food.quantity}</p>
    </div>
  );
}
