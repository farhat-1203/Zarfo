import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Search } from "lucide-react";
import api from "@/lib/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Leaf, Flame } from "lucide-react";

const getCategoryBadge = (category) => {
  const base =
    "px-2 py-0.5 text-[10px] font-semibold rounded-md inline-flex items-center gap-1 shadow-sm";
  switch (category?.toLowerCase()) {
    case "veg":
      return (
        <span className={`${base} bg-green-100 text-green-700`}>
          <Leaf className="w-3 h-3 text-green-600" />
          {category}
        </span>
      );
    case "non-veg":
      return (
        <span className={`${base} bg-red-100 text-red-700`}>
          <Flame className="w-3 h-3 text-red-600" />
          {category}
        </span>
      );
    case "sweet":
      return (
        <span className={`${base} bg-pink-100 text-pink-700`}>
          🍰 {category}
        </span>
      );
    case "spicy":
      return (
        <span className={`${base} bg-orange-100 text-orange-700`}>
          🌶️ {category}
        </span>
      );
    default:
      return (
        <span className={`${base} bg-gray-100 text-gray-700`}>
          {category || "Other"}
        </span>
      );
  }
};

export default function CartPage({ cart, setCart, fetchFood }) {
  const placeOrder = async (item) => {
    try {
    const response = await api.post("/user/order/create", { foodId: item._id });
      toast.success("Order placed successfully ✅");
      setCart((prev) => prev.filter((i) => i._id !== item._id));
      fetchFood();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        {cart.length > 0 && (
          <div className="px-3 py-1 text-sm rounded-md bg-[var(--bg-color)] ">
            {cart.length} items
          </div>
        )}
      </div>

      {cart.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cart.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="rounded-2xl overflow-hidden bg-[var(--card-bg)] shadow-md hover:shadow-xl transition-all border border-[rgba(0,0,0,0.05)]">
                <div className="relative">
                  <img
                    src={
                      item.images?.[0]
                        ? `data:image/png;base64,${item.images[0]}`
                        : "/placeholder.svg"
                    }
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    {getCategoryBadge(item.category)}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-semibold line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" /> {item.hotelName}
                    </span>
                    <span className="flex items-center gap-1 text-orange-600 font-medium">
                      <Clock className="w-4 h-4" />
                      {item.expiryTime
                        ? new Date(item.expiryTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div>
                      <div className="text-lg font-bold text-[var(--green-primary)]">
                        ₹{item.discountedPrice}
                      </div>
                      <div className="text-xs text-muted-foreground line-through">
                        ₹{item.originalPrice}
                      </div>
                    </div>
                    <Button
                      onClick={() => placeOrder(item)}
                      className="bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white"
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-16">
          <Search className="w-10 h-10 mx-auto mb-3 opacity-50" />
          Your cart is empty.
        </div>
      )}
    </div>
  );
}
